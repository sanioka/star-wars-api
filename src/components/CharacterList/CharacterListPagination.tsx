import { FC, useCallback, useMemo } from 'react'
import { range } from '../../helpers/range'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useDevice } from '../../hooks/use-device'

const CharacterListPagination: FC<Props> = ({ maxPageCount, currentPage, updateCurrentPage }) => {
  const { isMobile } = useDevice()
  const paginationList = useMemo(() => range(1, maxPageCount), [maxPageCount])

  const updateCurrentPageHandler = useCallback(
    (index: number) => {
      return () => updateCurrentPage(index)
    },
    [updateCurrentPage],
  )

  if (isMobile) {
    return (
      <Flex justifyContent="center" mb={1} mt={4} alignItems="center">
        <Button isDisabled={currentPage === 1} onClick={updateCurrentPageHandler(currentPage - 1)} m={1}>
          Prev
        </Button>

        <Button onClick={updateCurrentPageHandler(1)} m={1} isDisabled={currentPage === 1}>
          1
        </Button>

        <Text ml={5} mr={5}>
          Page {currentPage} of {maxPageCount}
        </Text>

        <Button onClick={updateCurrentPageHandler(maxPageCount)} m={1} isDisabled={currentPage === maxPageCount}>
          {maxPageCount}
        </Button>

        <Button isDisabled={currentPage === maxPageCount} onClick={updateCurrentPageHandler(currentPage + 1)} m={1}>
          Next
        </Button>
      </Flex>
    )
  }

  return (
    <Flex justifyContent="center" mb={1} mt={4}>
      {paginationList.map((index: number) => {
        return (
          <Button
            isDisabled={currentPage === index}
            key={`button${index}`}
            onClick={updateCurrentPageHandler(index)}
            m={1}
          >
            {index}
          </Button>
        )
      })}
    </Flex>
  )
}

export default CharacterListPagination

type Props = {
  maxPageCount: number
  currentPage: number
  updateCurrentPage: (index: number) => void
}
