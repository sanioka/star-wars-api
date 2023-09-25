import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from "axios";
import { IPeople } from "./IStarWars";
import { API_BASE_URl } from "../config";
import { IMAGE_DB } from "../helpers/character-images";

const CharacterPage = () => {
  // @ts-ignore
  const {id} = useParams();
  const [character, setCharacter] = useState<IPeople | null>(null);
  const characterImg = character?.name && IMAGE_DB[character.name] ? IMAGE_DB[character.name] : null;

  useEffect(() => {
    axios.get(`${API_BASE_URl}/people/${id}`)
      .then((response: AxiosResponse<IPeople>) => setCharacter(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className='CharacterPage'>
      <Link to="/">{'< Back'}</Link>

      {characterImg && <img src={characterImg} width="100" height="100" alt={character?.name}/>}

      <pre>
        {character ? JSON.stringify(character, null, 2) : 'Loading...'}
      </pre>
    </div>
  );
}

export default CharacterPage;
