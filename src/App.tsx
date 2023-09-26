import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Flex } from "@chakra-ui/react";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Page404 from "./components/Page404";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterPage from "./components/CharacterPage";

function App() {
  return (
    <Flex flexDirection="column" minH="100vh">
      <NavBar/>

      <Container maxW="container.md" bgColor="gray" flex="1">
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
