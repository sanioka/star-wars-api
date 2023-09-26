import React from "react";
import { Box, Center, Link, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box bg="teal.500" p={4} color="white">
      <Center>
        <Text>&copy; 2023 Alex @sanioka Ivanov</Text>
        {/*<Text w={15} textAlign="center">|</Text>*/}
        {/*<Link href="mailto:isanioka@gmail.com">isanioka@gmail.com</Link>*/}
      </Center>
    </Box>
  );
}

export default Footer;
