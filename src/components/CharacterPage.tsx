import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from "axios";
import { IPeople } from "./IStarWars";

const CharacterPage = () => {
  // @ts-ignore
  const {id} = useParams();
  const [character, setCharacter] = useState<IPeople | null>(null);

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/${id}`)
      .then((response: AxiosResponse<IPeople>) => setCharacter(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className='CharacterPage'>
      <Link to="/">{'< Back'}</Link>
      <pre>
        {JSON.stringify(character, null, 2)}
      </pre>
    </div>
  );
}

export default CharacterPage;
