import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterPage from "./components/CharacterPage";
import Page404 from "./components/Page404";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CharacterList}/>
        <Route path="/character/:id" component={CharacterPage}/>
        <Route path="*"><Page404 /></Route>
      </Switch>
    </Router>
  );
}

export default App;
