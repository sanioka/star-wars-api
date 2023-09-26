import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from "axios";
import { IPeople } from "../api/IStarWars";
import { API_BASE_URl } from "../config";
import { getImageIfExist } from "../helpers/character-mock-images";

const CharacterPage = () => {
  // @ts-ignore
  const {id} = useParams();
  let history = useHistory();

  const [character, setCharacter] = useState<IPeople | null>(null);
  const characterImg = getImageIfExist(character?.name)

  useEffect(() => {
    axios.get(`${API_BASE_URl}/people/${id}`)
      .then((response: AxiosResponse<IPeople>) => setCharacter(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  // TODO: refactor div
  return (
    <div>
      <a onClick={() => history.goBack()} href="#">{'< Back'}</a>

      {characterImg && <img src={characterImg} width="100" height="100" alt={character?.name}/>}

      <pre>
        {character ? JSON.stringify(character, null, 2) : 'Loading...'}
      </pre>
    </div>
  );
}

export default CharacterPage;
