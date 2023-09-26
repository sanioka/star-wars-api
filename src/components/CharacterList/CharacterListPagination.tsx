import { FC, useMemo } from "react";
import { range } from "../../helpers/range";
import { Button, Flex } from "@chakra-ui/react";

const CharacterListPagination: FC<Props> = ({maxPageCount, currentPage, updateCurrentPage}) => {
  const paginationList = useMemo(() => range(1, maxPageCount), [maxPageCount])

  return (
    <Flex justifyContent="center" mb={1} mt={4}>
      {paginationList.map((index: number) => {
        // TODO: Memoize onClick
        return (
          <Button
            isDisabled={currentPage === index}
            key={`button${index}`}
            onClick={() => updateCurrentPage(index)}
            m={1}>
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
