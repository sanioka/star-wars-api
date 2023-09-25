import { FC, useMemo } from "react";
import { range } from "../helpers/range";

const CharacterListPagination: FC<Props> = ({maxPageCount, currentPage, setCurrentPage}) => {
  const paginationList = useMemo(() => range(1, maxPageCount), [maxPageCount])

  return <div className={"CharacterList-pagination"}>
    {
      paginationList.map((index: number) => {
        if (currentPage === index) {
          return <div key={`div${index}`}>{index}</div>
        } else {
          // TODO: Memoize it
          return <button key={`button${index}`} onClick={() => setCurrentPage(index)}>{index}</button>
        }
      })
    }
  </div>
}

export default CharacterListPagination

type Props = {
  maxPageCount: number
  currentPage: number
  setCurrentPage: (index: number) => void
}
