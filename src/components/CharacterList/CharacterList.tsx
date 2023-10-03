import React, { useCallback, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { API_PAGINATION_COUNT } from '../../config'
import { fetchCharacterList } from '../../api/star-wars-api'
import { ApiResponse, IPeople } from '../../api/IStarWars'
import useSearchParams from '../../hooks/use-search-params'
import { getImageIfExist } from '../../helpers/character-mock-images'

import CharacterListPagination from './CharacterListPagination'
import CharacterListItem from './CharacterListItem'
import LoadingSpinner from '../App/LoadingSpinner'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { scrollOnTop } from '../../helpers/scroll-on-top'
import { isValidId } from '../../helpers/validators'
import PageError from '../App/PageError'

const CharacterList = () => {
  const history = useHistory()

  const searchParams = useSearchParams()
  const currentPageParam = searchParams.get('page') || '1'
  const currentPage = Number(currentPageParam)

  const updateCurrentPage = useCallback((pageIndex: number) => history.push(`/?page=${pageIndex}`), [history])

  const { isLoading, data, isError, error } = useQuery<ApiResponse, Error>(
    [`characterList-page${currentPage}`],
    () => (isValidId(currentPageParam) ? fetchCharacterList(currentPage) : Promise.reject('Invalid page id from url')),
    {
      staleTime: Infinity,
    },
  )
  const characters = data?.results
  const maxPageCount = useMemo(() => (data ? Math.ceil(data.count / 10) : 0), [data])

  useEffect(() => scrollOnTop(), [currentPage])

  if (!isValidId(currentPageParam)) return <PageError />

  if (isError) return <PageError message={error?.message ? error.message : JSON.stringify(error)} />

  if (isLoading) return <LoadingSpinner />

  return (
    <Flex flexDirection="column">
      {currentPage > 1 && <Breadcrumbs items={[{ name: 'Home' }, { name: `Page ${currentPage}`, inactive: true }]} />}

      <Box flex="1" mt={4} mb={4}>
        <SimpleGrid columns={[2, 3, 4, 5]} spacingX={8} spacingY={8}>
          {characters &&
            characters.map((item: IPeople, index: number) => {
              let characterId: number = (currentPage - 1) * API_PAGINATION_COUNT + index + 1

              // Workaround to fix backend bug with id and pagination diff 🤦, because API /people/17 is shifted to /people/18
              if (characterId >= 17) characterId++

              const characterImg = getImageIfExist(characterId)
              return (
                <CharacterListItem key={item.name} imageSrc={characterImg} name={item.name} characterId={characterId} />
              )
            })}
        </SimpleGrid>
      </Box>

      {maxPageCount && (
        <CharacterListPagination
          maxPageCount={maxPageCount}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
        />
      )}
    </Flex>
  )
}

export default CharacterList
