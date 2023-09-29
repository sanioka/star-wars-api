import { useParams } from 'react-router-dom'
import { Flex, Box, Image, VStack, Text, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useQuery } from 'react-query'

import { API_BASE_URl, IS_DEBUG } from '../config'
import Breadcrumbs from './Breadcrumbs/Breadcrumbs'
import LoadingSpinner from './App/LoadingSpinner'

import { getImageIfExist } from '../helpers/character-mock-images'
import fallbackImageSrc from './CharacterList/img/fallback-img1.png'

const CharacterPage = () => {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useQuery(`character${id}`, () => axios.get(`${API_BASE_URl}/people/${id}`))
  const characterData = data?.data

  if (isLoading) return <LoadingSpinner />

  return (
    <Flex flexDirection="column" justifyContent="space-between" mb={[4, 8]} w={{ base: '100%', lg: '75%' }}>
      <Breadcrumbs items={[{ name: 'Home' }, { name: characterData?.name || '', inactive: true }]} />

      <Flex
        flexDirection={['column', 'row']}
        borderRadius="md"
        p={[4, 8]}
        borderWidth="1px"
        alignItems="top"
        position={'relative'}
      >
        <Flex w={150} justifyContent="center">
          <Image
            // boxSize='150px'
            maxW="150px"
            maxH="200px"
            objectFit="cover"
            src={getImageIfExist(characterData?.name)}
            alt={characterData?.name}
            borderRadius="md"
            fallbackSrc={fallbackImageSrc}
          />
        </Flex>

        <VStack ml={[0, 8]} mt={[4, 0]} alignItems="left" flex={1}>
          <Heading as="h4" size="sm" mb={1}>
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

        <Box color="gray.500" position={'absolute'} right={['1em', 8]} top={['0.5em', 8]}>
          Edit
        </Box>
      </Flex>

      {IS_DEBUG && (
        // Collapse
        <Box color="gray.500" mt={8}>
          <Text>Raw data from API:</Text>
          <pre>{JSON.stringify(characterData, null, 2)}</pre>
        </Box>
      )}
    </Flex>
  )
}

export default CharacterPage
