import { FC } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const defaultMessage = 'Error 404: Page not found'
const PageError: FC<Props> = ({ message }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" flex={1}>
      <Text>{message ? `Error: ${message}` : defaultMessage}</Text>
      <Button mt={4} as={ReactRouterLink} to={'/'}>
        Home
      </Button>
    </Flex>
  )
}

type Props = {
  message?: string
}

export default PageError
