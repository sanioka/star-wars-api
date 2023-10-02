import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Flex, Box, Image, VStack, Text } from '@chakra-ui/react'

import { IS_DEBUG } from '../../config'
import { fetchCharacter } from '../../api/star-wars-api'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import LoadingSpinner from '../App/LoadingSpinner'

import { getImageIfExist } from '../../helpers/character-mock-images'
import { scrollOnTop } from '../../helpers/scroll-on-top'
import PageError from '../App/PageError'
import { isValidId } from '../../helpers/validators'
import EditableField from './EditableField'
import { IPeople } from '../../api/IStarWars'
import { fieldList } from './field-list'

const CharacterPage = () => {
  const { id } = useParams() as { id: string }

  // UX improvement for mobile devices
  useEffect(() => scrollOnTop(), [])

  const {
    isLoading,
    data: characterServerData,
    isError,
    error,
  } = useQuery(
    [`characterPage-${id}`],
    () => (isValidId(id) ? fetchCharacter(id) : Promise.reject('Invalid id from url')),
    {
      staleTime: Infinity,
    },
  )

  const [isEditMode, setEditMode] = useState(false)
  const [storage, setStorage] = useState<IPeople | undefined>(undefined)
  const characterData: any = useMemo(() => (storage ? storage : characterServerData), [storage, characterServerData])

  const onChangeHandler = (fieldId: string, nextValue: string) => {
    setStorage((value) => {
      const newValue = value ? Object.assign({}, value) : Object.assign({}, characterServerData)
      // @ts-ignore
      newValue[fieldId] = nextValue ? nextValue : 'n/a' //characterServerData[fieldId]
      return newValue
    })
  }

  if (!isValidId(id)) return <PageError />

  if (isError) {
    // @ts-ignore
    return <PageError message={error?.message ? error.message : JSON.stringify(error)} />
  }
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
            src={getImageIfExist(characterData?.name)}
            alt={characterData?.name}
            borderRadius="md"
          />
        </Flex>

        <VStack ml={[0, 8]} mt={[4, 0]} alignItems="left" flex={1}>
          {fieldList.map((fieldItem) => (
            <EditableField
              key={fieldItem.id}
              fieldItem={fieldItem}
              fieldData={characterData ? characterData[fieldItem.id] : undefined}
              isEditMode={isEditMode}
              onDoubleClick={() => !isEditMode && setEditMode(true)}
              onChange={onChangeHandler}
            />
          ))}

          <Flex alignItems="baseline" justifyContent="space-between">
            <Box>
              {storage && (
                <Text color="gray.500" mt={2}>
                  &#9888; Data edited locally only on your computer
                </Text>
              )}
            </Box>

            {isEditMode && (
              <Flex minW="4em" color="gray.500" justifyContent="right" alignItems="center" mt={1}>
                <Text cursor="pointer" onClick={() => setEditMode(false)}>
                  Save
                </Text>
              </Flex>
            )}
          </Flex>
        </VStack>

        {!isEditMode && (
          <Flex minW="4em" flexDirection="column" color="gray.500" alignItems="flex-end">
            <Text cursor="pointer" onClick={() => setEditMode(true)}>
              Edit
            </Text>

            {storage && (
              <Text cursor="pointer" onClick={() => setStorage(undefined)} mt={2}>
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
