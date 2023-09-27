import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Flex } from "@chakra-ui/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Page404 from "./components/Page404";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterPage from "./components/CharacterPage";

function App() {
  return (
    <Flex flexDirection="column" minH="100vh">
      <Header/>

      <Container maxW="container.md" flex="1" display="flex" flexDirection="column">
        <Router>
          <Switch>
            <Route exact path="/" component={CharacterList}/>
            <Route path="/character/:id" component={CharacterPage}/>
            <Route path="*"><Page404/></Route>
          </Switch>
        </Router>
      </Container>

      <Footer/>
    </Flex>
  );
}

export default App;
