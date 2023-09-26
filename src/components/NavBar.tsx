import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Link,
  VStack,
  HStack,
} from "@chakra-ui/react";

function NavBar() {
  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex alignItems="center">
        <Heading size="md">Star Wars Universe</Heading>
        {/*<Spacer />*/}
        {/*<HStack spacing={4}>*/}
        {/*  <Link href="#">Home</Link>*/}
        {/*  <Link href="#">About</Link>*/}
        {/*  <Link href="#">Services</Link>*/}
        {/*  <Link href="#">Contact</Link>*/}
        {/*</HStack>*/}
      </Flex>
    </Box>
  );
}

export default NavBar;
