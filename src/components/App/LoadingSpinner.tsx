import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" flex="1">
      {/*<Text color='gray.700'>Loading...</Text>*/}
      <Spinner speed="0.65s" />
    </Flex>
  )
}

export default LoadingSpinner
