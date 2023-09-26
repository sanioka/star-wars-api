import React, { CSSProperties } from "react";
import { Center, Flex, Link, Text, VStack } from "@chakra-ui/react";

// example with style prop
const footerStyle: CSSProperties = {
  width: "100%",
  padding: "10px",
  textAlign: "center",
  marginTop: 0,
};

function Footer() {
  return (
    <Center style={footerStyle}>
      <VStack spacing="0" color="gray.500">
        <Flex flexDirection="row">
          <Text>&copy; 2023 Created by Alex @sanioka Ivanov</Text>
          {/*<Text w={15} textAlign="center">|</Text>*/}
          {/*<Link href="mailto:isanioka@gmail.com">isanioka@gmail.com</Link>*/}
        </Flex>
        <Flex flexDirection="row">
          <Text>Used swapi.dev API and data from Wookiepedia</Text>
          <Text w={15} textAlign="center">|</Text>
          <Text>Star Wars and all associated names are copyright Lucasfilm ltd</Text>
        </Flex>
      </VStack>
    </Center>
  );
}

export default Footer;
