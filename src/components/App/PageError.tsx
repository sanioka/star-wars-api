import { FC } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const defaultMessage = 'Error 404: Page not found'
const PageError: FC<Props> = ({ error }) => {
  let message
  if (!error) {
    message = defaultMessage
  } else {
    message = typeof error === 'string' ? error : error?.message ? error.message : JSON.stringify(error)
  }
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
  error?: string | Error
}

export default PageError
