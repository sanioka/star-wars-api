import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// Enable dark theme automatically if needed https://chakra-ui.com/docs/styled-system/color-mode
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({ config })

export default theme
