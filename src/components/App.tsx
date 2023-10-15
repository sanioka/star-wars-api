import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Flex } from '@chakra-ui/react'

import Header from './App/Header'
import Footer from './App/Footer'
import PageError from './App/PageError'
import CharacterList from './CharacterList'
import CharacterPage from './CharacterPage'

// TODO: remove basename hardcode
function App() {
  return (
    <Router basename="/star-wars-api-demo">
      <Container maxW="container.lg" flexDirection="column" minH="100vh" display={'flex'}>
        <Header />

        <Flex maxW="container.lg" flex="1" flexDirection="column">
          <Switch>
            <Route exact path="/" component={CharacterList} />
            <Route exact path="/character/:id" component={CharacterPage} />
            <Route path="*">
              <PageError />
            </Route>
          </Switch>
        </Flex>

        <Footer />
      </Container>
    </Router>
  )
}

export default App
