import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import "./CharacterList.css"
import { Link, useHistory } from "react-router-dom";
import { IPeople } from "../IStarWars";
import CharacterListPagination from "./CharacterListPagination";
import { API_BASE_URl } from "../../config";
import useQuery from "../../hooks/use-query";

type ApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: IPeople[];
}

const CharacterList = () => {
  let history = useHistory();
  let query = useQuery();

  const [characters, setCharacters] = useState<IPeople[]>([]);
  const [maxPageCount, setMaxPageCount] = useState<null | number>(null);
  let currentPage = Number(query.get("page")) || 1

  const updateCurrentPage = useCallback((index: number) => {
      setCharacters([])
      history.push(`/?page=${index}`);
    }, [history]
  )

  useEffect(() => {
    axios.get(`${API_BASE_URl}/people/?page=${currentPage}`)
      .then((response: AxiosResponse<ApiResponse>) => {
        setCharacters(response.data.results)
        if (!maxPageCount) setMaxPageCount(Math.ceil(response.data.count / 10))
      })
      .catch((error) => console.error(error));
  }, [currentPage, maxPageCount]);

  if (!characters.length) return <div>Loading...</div>

  return (
    <div className="CharacterList">
      <ul>
        {characters.map((item: IPeople, index) => {
            let characterId: number = (currentPage - 1) * 10 + index + 1

            // Workaround to fix backend bug with id and pagination 🤦‍
            if (characterId >= 17) characterId++

            return <li key={item.name}>
              <Link to={`/character/${characterId}`}>{item.name}</Link>
            </li>
          }
        )}
      </ul>

      {maxPageCount && <CharacterListPagination maxPageCount={maxPageCount}
                                                currentPage={currentPage}
                                                updateCurrentPage={updateCurrentPage}/>}
    </div>
  );
}

export default CharacterList;
