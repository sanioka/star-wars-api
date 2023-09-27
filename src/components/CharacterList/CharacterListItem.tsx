import React, { FC } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import fallbackImageSrc from './img/fallback-img1.png';

const CharacterListItem: FC<Props> = ({imageSrc, name, characterId}) => {
  return (
    <Flex justifyContent={['center', 'left']} w='150px'>
      <LinkBox as='div' display='flex' flexDirection='column' alignItems='center' w='100%'>
        <Image
          // boxSize='150px'
          maxW='150px'
          maxH='200px'
          // w='150px'
          // h='200px'
          objectFit='cover'
          src={imageSrc}
          alt={name}
          borderRadius='md'
          fallbackSrc={fallbackImageSrc}
        />
        <LinkOverlay as={ReactRouterLink} to={`/character/${characterId}`}>
          <Text mt='1'>{name}</Text>
        </LinkOverlay>

      </LinkBox>
    </Flex>
  )
}

type Props = {
  imageSrc?: string
  name: string
  characterId: number
}

export default CharacterListItem
