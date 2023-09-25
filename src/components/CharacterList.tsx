import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import "./CharacterList.css"
import { Link } from "react-router-dom";
import { IPeople } from "./IStarWars";

type ApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: IPeople[];
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<IPeople[]>([]);

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then((response: AxiosResponse<ApiResponse>) => setCharacters(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="CharacterList">
      <ul>
        {characters.map((item: IPeople, index) =>
          <li key={item.name}>
            <Link to={`/character/${index + 1}`}>{item.name}</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default CharacterList;
