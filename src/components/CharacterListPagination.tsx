import { FC, useMemo } from "react";
import { range } from "../helpers/range";

const CharacterListPagination: FC<Props> = ({maxPageCount, currentPage, updateCurrentPage}) => {
  const paginationList = useMemo(() => range(1, maxPageCount), [maxPageCount])

  return <div className={"CharacterList-pagination"}>
    {
      paginationList.map((index: number) => {
        if (currentPage === index) {
          return <div key={`div${index}`}>{index}</div>
        } else {
          // TODO: Memoize onClick
          return <button key={`button${index}`} onClick={() => updateCurrentPage(index)}>{index}</button>
        }
      })
    }
  </div>
}

export default CharacterListPagination

type Props = {
  maxPageCount: number
  currentPage: number
  updateCurrentPage: (index: number) => void
}
