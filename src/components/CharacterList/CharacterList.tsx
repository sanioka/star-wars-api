import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { API_BASE_URl, API_PAGINATION_COUNT, SHOW_BREADCRUMBS_ON_HOMEPAGE } from '../../config'
import { getImageIfExist } from '../../helpers/character-mock-images'
import { ApiResponse, IPeople } from '../../api/IStarWars'
import useSearchParams from '../../hooks/use-query'

import CharacterListPagination from './CharacterListPagination'
import CharacterListItem from './CharacterListItem'
import LoadingSpinner from '../App/LoadingSpinner'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

const CharacterList = () => {
  const history = useHistory()

  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const updateCurrentPage = useCallback((pageIndex: number) => history.push(`/?page=${pageIndex}`), [history])

  const { isLoading, data } = useQuery(`characterList-page${currentPage}`, async () => {
    const response: AxiosResponse<ApiResponse> = await axios.get(`${API_BASE_URl}/people/?page=${currentPage}`)
    return response.data
  })
  const characters = data?.results
  const maxPageCount = useMemo(() => (data ? Math.ceil(data.count / 10) : 0), [data])

  if (isLoading) return <LoadingSpinner />

  return (
    <Flex flexDirection="column">
      {SHOW_BREADCRUMBS_ON_HOMEPAGE && <Breadcrumbs items={[{ name: 'Home', inactive: true }]} />}

      <Box flex="1" mt={4} mb={4}>
        <SimpleGrid columns={[2, 3, 4, 5]} spacingX={8} spacingY={8}>
          {characters &&
            characters.map((item: IPeople, index: number) => {
              let characterId: number = (currentPage - 1) * API_PAGINATION_COUNT + index + 1

              // Workaround to fix backend bug with id and pagination diff 🤦, because API /people/17 is shifted to /people/18
              if (characterId >= 17) characterId++

              const characterImg = getImageIfExist(item.name)
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
