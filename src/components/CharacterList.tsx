import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import "./CharacterList.css"
import { Link } from "react-router-dom";
import { IPeople } from "./IStarWars";
import CharacterListPagination from "./CharacterListPagination";
import { API_BASE_URl } from "../config";

type ApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: IPeople[];
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<IPeople[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState<null | number>(null);

  const updateCurrentPage = useCallback((index: number) => {
      setCurrentPage(index)
      setCharacters([])
    }, []
  )

  useEffect(() => {
    axios.get(`${API_BASE_URl}/people/?page=${currentPage}`)
      .then((response: AxiosResponse<ApiResponse>) => {
        setCharacters(response.data.results)
        if (!maxPageCount) setMaxPageCount(Math.ceil(response.data.count / response.data.results.length))
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  if (!characters.length) return <div>Loading...</div>

  return (
    <div className="CharacterList">
      <ul>
        {characters.map((item: IPeople, index) =>
          <li key={item.name}>
            <Link to={`/character/${index + 1}`}>{item.name}</Link>
          </li>
        )}
      </ul>

      {maxPageCount && <CharacterListPagination maxPageCount={maxPageCount}
                                                currentPage={currentPage}
                                                updateCurrentPage={updateCurrentPage}/>}
    </div>
  );
}

export default CharacterList;
