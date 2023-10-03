import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Flex, Box, Image, VStack, Text } from '@chakra-ui/react'

import { IS_DEBUG } from '../../config'
import { fetchCharacter } from '../../api/star-wars-api'
import Breadcrumbs from '../Breadcrumbs'
import LoadingSpinner from '../App/LoadingSpinner'

import { getImageIfExist } from '../../helpers/character-mock-images'
import { scrollOnTop } from '../../helpers/scroll-on-top'
import PageError from '../App/PageError'
import { isValidId } from '../../helpers/validators'
import EditableField from './EditableField'
import { IPeople, IPeopleBase } from '../../api/IStarWars'
import { fieldList } from './field-list'
import { useCharacterStore } from '../../store/store'
import { useShallow } from 'zustand/shallow'

const CharacterPage = () => {
  const { id } = useParams() as { id: string }

  // UX improvement for mobile devices
  useEffect(() => scrollOnTop(), [])

  const {
    isLoading,
    data: serverData,
    isError,
    error,
  } = useQuery<IPeople, Error>(
    [`characterPage-${id}`],
    () => (isValidId(id) ? fetchCharacter(id) : Promise.reject('Invalid id from url')),
    {
      staleTime: Infinity,
    },
  )

  const [isEditMode, setEditMode] = useState(false)

  const { localData, changeLocalData, deleteLocalData } = useCharacterStore(
    useShallow((state) => ({
      localData: state.data[id],
      changeLocalData: state.changeData,
      deleteLocalData: state.deleteData,
    })),
  )

  // const { nuts, honey } = useBearStore(useShallow((state) => ({ nuts: state.nuts, honey: state.honey })))

  // Local localData has more priority than API data
  const characterData = localData ? localData : serverData

  const resetStorage = useCallback(() => deleteLocalData(id), [deleteLocalData, id])
  const onChangeHandler = useCallback(
    (fieldId: string, nextValue: string) => {
      const result = Object.assign({}, characterData)
      result[fieldId as keyof IPeopleBase] = nextValue ? nextValue : 'n/a'
      changeLocalData(id, result)
    },
    [changeLocalData, characterData, id],
  )

  const enableEditMode = useCallback(() => setEditMode(true), [])
  const disableEditMode = useCallback(() => setEditMode(false), [])
  const doubleClickHandler = useCallback(() => !isEditMode && enableEditMode(), [isEditMode, enableEditMode])

  if (!isValidId(id)) return <PageError />
  if (isError) return <PageError error={error} />
  if (isLoading) return <LoadingSpinner />

  return (
    <Flex flexDirection="column" justifyContent="space-between" mb={[4, 8]} w={{ base: '100%', lg: '75%' }}>
      <Breadcrumbs items={[{ name: 'Home' }, { name: characterData?.name || '', inactive: true }]} />

      <Flex flexDirection={['column', 'row']} borderRadius="md" p={[4, 8]} borderWidth="1px" alignItems="top">
        <Flex w={150} justifyContent="center">
          <Image
            // boxSize='150px'
            maxW="150px"
            maxH="200px"
            objectFit="cover"
            src={getImageIfExist(id)}
            alt={characterData?.name}
            borderRadius="md"
          />
        </Flex>

        <VStack ml={[0, 8]} mt={[4, 0]} alignItems="left" flex={1}>
          {fieldList.map((fieldItem) => (
            <EditableField
              key={fieldItem.id}
              fieldItem={fieldItem}
              value={characterData ? characterData[fieldItem.id] : undefined}
              isEditMode={isEditMode}
              onDoubleClick={doubleClickHandler}
              onChange={onChangeHandler}
            />
          ))}

          <Flex alignItems="baseline" justifyContent="space-between">
            <Box>
              {localData && (
                <Text color="gray.500" mt={2} mb={[isEditMode ? 0 : 4, 0]}>
                  &#9888; Data edited locally only on your computer
                </Text>
              )}
            </Box>

            {isEditMode && (
              <Flex minW="4em" color="gray.500" justifyContent="right" alignItems="center" mt={1}>
                <Text cursor="pointer" onClick={disableEditMode}>
                  {localData ? 'Save' : 'Cancel'}
                </Text>
              </Flex>
            )}
          </Flex>
        </VStack>

        {!isEditMode && (
          <Flex minW="4em" flexDirection="column" color="gray.500" alignItems="flex-end">
            <Text cursor="pointer" onClick={enableEditMode}>
              Edit
            </Text>

            {localData && (
              <Text cursor="pointer" onClick={resetStorage} mt={2}>
                Reset
              </Text>
            )}
          </Flex>
        )}
      </Flex>

      {IS_DEBUG && (
        // Collapse
        <Box color="gray.500" mt={8}>
          <Text>Raw data from API:</Text>
          <pre>{JSON.stringify(characterData, null, 2)}</pre>
        </Box>
      )}
    </Flex>
  )
}

export default CharacterPage
