import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Flex } from '@chakra-ui/react'

import Header from './App/Header/Header'
import Footer from './App/Footer'
import Page404 from './App/Page404'
import CharacterList from './CharacterList/CharacterList'
import CharacterPage from './CharacterPage'

function App() {
  return (
    <Router>
      <Container maxW="container.lg" flexDirection="column" minH="100vh" display={'flex'}>
        <Header />

        <Flex maxW="container.lg" flex="1" flexDirection="column">
          <Switch>
            <Route exact path="/" component={CharacterList} />
            <Route path="/character/:id" component={CharacterPage} />
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </Flex>

        <Footer />
      </Container>
    </Router>
  )
}

export default App
