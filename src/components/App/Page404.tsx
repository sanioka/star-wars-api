import { Button, Flex, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const Page404 = () => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" flex={1}>
      <Text>Error 404: Page not found</Text>
      <Button mt={4} as={ReactRouterLink} to={'/'}>
        Home
      </Button>
    </Flex>
  )
}

export default Page404
