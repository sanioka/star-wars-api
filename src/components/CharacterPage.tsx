import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, HStack, Box, Image, VStack, Text, Heading } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";

import { API_BASE_URl, IS_DEBUG } from "../config";
import { IPeople } from "../api/IStarWars";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import LoadingSpinner from './LoadingSpinner';

import { getImageIfExist } from "../helpers/character-mock-images";
import fallbackImageSrc from "./CharacterList/img/fallback-img1.png";

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

  if (!characterData) return <LoadingSpinner/>

  return (
    <Flex flexDirection="column" justifyContent="space-between" mb={8}>
      <Breadcrumbs items={[
        {name: 'Home'},
        {name: characterData?.name || '', inactive: true},
      ]}/>

      <Box borderRadius='md' p={8} borderWidth='1px'>
        <HStack alignItems='top'>
          <Box w={150}>
            <Image
              // w={150}
              // maxH={200}
              // boxSize='150px'
              objectFit='cover'
              src={characterImg}
              alt={characterData?.name}
              borderRadius='md'
              fallbackSrc={fallbackImageSrc}
            />
          </Box>

          <VStack ml={8} alignItems='left' flex={1}>
            <Heading as='h4' size='sm' mb={1}>
              {characterData?.name || ''}
            </Heading>
            <Text>Birth year: {characterData?.birth_year || ''}</Text>
            <Text>Gender: {characterData?.gender || ''}</Text>
            <Text>Mass: {characterData?.mass || ''}kgs</Text>
            <Text>Height: {characterData?.height || ''}cm</Text>
            <Text>Hair color: {characterData?.hair_color || ''}</Text>
            <Text>Skin Color: {characterData?.skin_color || ''}</Text>
            <Text>Eye color: {characterData?.eye_color || ''}</Text>
          </VStack>

          <Box color='gray.500'>Edit</Box>
        </HStack>
      </Box>

      {IS_DEBUG && (
        <Box color='gray.500' mt={8}>
          <Text>Raw data from API:</Text>
          <pre>
          {JSON.stringify(characterData, null, 2)}
        </pre>
        </Box>
      )}
    </Flex>
  );
}

export default CharacterPage;
