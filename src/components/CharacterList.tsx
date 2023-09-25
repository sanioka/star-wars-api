import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import "./CharacterList.css"
import { Link } from "react-router-dom";
import { IPeople } from "./IStarWars";
import { range } from "../helpers/range";

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

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then((response: AxiosResponse<ApiResponse>) => {
        setCharacters(response.data.results)
        if (!maxPageCount) setMaxPageCount(Math.ceil(response.data.count / response.data.results.length))
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  return (
    <div className="CharacterList">
      <ul>
        {characters.map((item: IPeople, index) =>
          <li key={item.name}>
            <Link to={`/character/${index + 1}`}>{item.name}</Link>
          </li>
        )}
      </ul>

      {maxPageCount &&
        <div className={"CharacterList-pagination"}>
          {
            range(1, maxPageCount, 1).map((index: number) => {
              if (currentPage === index) {
                return <div key={`div${index}`}>{index}</div>
              } else {
                return <button key={`button${index}`} onClick={() => setCurrentPage(index)}>{index}</button>
              }
            })
          }
        </div>
      }
    </div>
  );
}

export default CharacterList;
