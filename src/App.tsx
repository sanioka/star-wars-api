import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Flex } from "@chakra-ui/react";

import Header from "./components/App/Header/Header";
import Footer from "./components/App/Footer";
import Page404 from "./components/App/Page404";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterPage from "./components/CharacterPage";

function App() {
  return (
    <Container maxW="container.lg" flexDirection="column" minH="100vh" display={'flex'}>
      <Header/>

      <Flex maxW="container.lg" flex="1" flexDirection="column">
        <Router>
          <Switch>
            <Route exact path="/" component={CharacterList}/>
            <Route path="/character/:id" component={CharacterPage}/>
            <Route path="*"><Page404/></Route>
          </Switch>
        </Router>
      </Flex>

      <Footer/>
    </Container>
  );
}

export default App;
