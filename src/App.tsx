import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterPage from "./components/CharacterPage";
import Page404 from "./components/Page404";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar/>

      <Router>
        <Switch>
          <Route exact path="/" component={CharacterList}/>
          <Route path="/character/:id" component={CharacterPage}/>
          <Route path="*"><Page404/></Route>
        </Switch>
      </Router>

      <Footer/>
    </>
  );
}

export default App;
