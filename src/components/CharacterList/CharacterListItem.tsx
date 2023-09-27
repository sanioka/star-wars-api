import React, { FC } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import fallbackImageSrc from './img/fallback-img1.png';

const CharacterListItem: FC<Props> = ({imageSrc, name, characterId}) => {
  return (
    <LinkBox as='div' p="4" borderWidth='1px' rounded='md' textAlign='center'>
      <Image
        // boxSize='150px'
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
  )
}

type Props = {
  imageSrc?: string
  name: string
  characterId: number
}

export default CharacterListItem
