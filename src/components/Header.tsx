import React from "react";
import { Flex, Heading, Container} from "@chakra-ui/react";

function Header() {
  return (
    <Container bg="teal.500" pt={4} pb={4} color="white" maxW="full">
      <Flex alignItems="center">
        <Heading size="md">Star Wars Characters</Heading>
        {/*<Spacer />*/}
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
