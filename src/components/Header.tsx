import React from "react";
import { Flex, Heading, Container, Spacer } from "@chakra-ui/react";
import ThemeButton from "./ThemeButton";

function Header() {
  return (
    <Container pt={4} pb={4} maxW="full">
      <Flex alignItems="center">
        <Heading size="md">Star Wars Characters</Heading>
        <Spacer />
        <ThemeButton/>
        {/*<HStack spacing={4}>*/}
        {/*  <Link href="#">Home</Link>*/}
        {/*  <Link href="#">About</Link>*/}
        {/*  <Link href="#">Services</Link>*/}
        {/*  <Link href="#">Contact</Link>*/}
        {/*</HStack>*/}
      </Flex>
    </Container>
  );
}

export default Header;
