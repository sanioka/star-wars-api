import React from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode} variant='outline'>
      {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export default ThemeButton
