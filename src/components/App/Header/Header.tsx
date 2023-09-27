import React from "react";
import { Heading, Spacer, Flex } from "@chakra-ui/react";
import ThemeButton from "./ThemeButton";

function Header() {
  return (
    <Flex pt={4} pb={4} alignItems="center">
      <Heading size="md" as='div'>Star Wars Characters</Heading>
      <Spacer/>
      <ThemeButton/>
      {/*<HStack spacing={4}>*/}
      {/*  <Link href="#">Home</Link>*/}
      {/*  <Link href="#">About</Link>*/}
      {/*  <Link href="#">Services</Link>*/}
      {/*  <Link href="#">Contact</Link>*/}
      {/*</HStack>*/}
    </Flex>
  );
}

export default Header;
