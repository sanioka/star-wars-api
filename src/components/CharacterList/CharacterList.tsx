import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'

import { API_BASE_URl, API_PAGINATION_COUNT } from "../../config";
import { getImageIfExist } from "../../helpers/character-mock-images";
import useQuery from "../../hooks/use-query";

import { ApiResponse, IPeople } from "../../api/IStarWars";
import CharacterListPagination from "./CharacterListPagination";
import CharacterListItem from "./CharacterListItem";
import LoadingSpinner from "../LoadingSpinner";
// import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

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

  if (!characters.length) return <LoadingSpinner/>

  return (
    <Flex flexDirection="column">
      {/*<Breadcrumbs items={[*/}
      {/*  {name: 'Home', inactive: true},*/}
      {/*]}/>*/}

      <Box flex="1" mt={4} mb={4}>
        <SimpleGrid columns={[2, 3, 4, 5]} spacingX={8} spacingY={8}>
          {characters.map((item: IPeople, index) => {
              let characterId: number = (currentPage - 1) * API_PAGINATION_COUNT + index + 1

              // Workaround to fix backend bug with id and pagination diff 🤦, because API /people/17 is shifted to /people/18
              if (characterId >= 17) characterId++

              const characterImg = getImageIfExist(item.name)
              return <CharacterListItem key={item.name}
                                        imageSrc={characterImg}
                                        name={item.name}
                                        characterId={characterId}/>
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
