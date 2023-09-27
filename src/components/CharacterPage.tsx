import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";

import { API_BASE_URl } from "../config";
import { IPeople } from "../api/IStarWars";
import { getImageIfExist } from "../helpers/character-mock-images";
// import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const CharacterPage = () => {
  // @ts-ignore
  const {id} = useParams();

  const [characterData, setCharacterData] = useState<IPeople | null>(null);
  const characterImg = getImageIfExist(characterData?.name)

  useEffect(() => {
    axios.get(`${API_BASE_URl}/people/${id}`)
      .then((response: AxiosResponse<IPeople>) => setCharacterData(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Breadcrumbs items={[
        {name: 'Home'},
        {name: characterData?.name || '', inactive: true},
      ]}/>

      {characterImg && <img src={characterImg} width="100" height="100" alt={characterData?.name}/>}

      <pre>
        {characterData ? JSON.stringify(characterData, null, 2) : 'Loading...'}
      </pre>
    </Flex>
  );
}

export default CharacterPage;
