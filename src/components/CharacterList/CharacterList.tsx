import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
import { Box, Card, CardBody, Flex, Image, SimpleGrid } from '@chakra-ui/react'

import { API_BASE_URl, API_PAGINATION_COUNT } from "../../config";
import { getImageIfExist } from "../../helpers/character-mock-images";
import useQuery from "../../hooks/use-query";

import { ApiResponse, IPeople } from "../../api/IStarWars";
import CharacterListPagination from "./CharacterListPagination";
import Breadcrumbs from "../Breadcrumbs";

// TODO: refactor this feature
const fallbackSrc = 'https://via.placeholder.com/150'

const CharacterList = () => {
  let history = useHistory();

  let query = useQuery();
  let currentPage = Number(query.get("page")) || 1

  const [characters, setCharacters] = useState<IPeople[]>([]);
  const [maxPageCount, setMaxPageCount] = useState<null | number>(null);

  const updateCurrentPage = useCallback((pageIndex: number) => {
      setCharacters([])
      history.push(`/?page=${pageIndex}`);
    }, [history]
  )

  useEffect(() => {
    axios.get(`${API_BASE_URl}/people/?page=${currentPage}`)
      .then((response: AxiosResponse<ApiResponse>) => {
        setCharacters(response.data.results)
        if (!maxPageCount) setMaxPageCount(Math.ceil(response.data.count / 10))
      })
      .catch((error) => console.error(error));
  }, [currentPage, maxPageCount]);

  if (!characters.length) return <div>Loading...</div>

  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Breadcrumbs/>

      <Box flex="1">
        <SimpleGrid columns={[2, 3, 4]} spacing={5}>
          {characters.map((item: IPeople, index) => {
              let characterId: number = (currentPage - 1) * API_PAGINATION_COUNT + index + 1

              // Workaround to fix backend bug with id and pagination diff 🤦, because API /people/17 is shifted to /people/18
              if (characterId >= 17) characterId++

              const characterImg = getImageIfExist(item.name)

              return (
                <Card key={item.name}>
                  <CardBody>
                    <Image
                      // boxSize='150px'
                      objectFit='cover'
                      src={characterImg}
                      alt={item.name}
                      borderRadius='lg'
                      fallbackSrc={fallbackSrc}
                    />
                    <Link to={`/character/${characterId}`}>{item.name}</Link>
                  </CardBody>
                </Card>
              )
            }
          )}
        </SimpleGrid>
      </Box>

      {maxPageCount &&
        <CharacterListPagination
          maxPageCount={maxPageCount}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
        />}
    </Flex>
  );
}

export default CharacterList;
