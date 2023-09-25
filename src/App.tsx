import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import CharacterList from "./components/CharacterList";
import CharacterPage from "./components/CharacterPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CharacterList}/>
        <Route path="/character/:id" component={CharacterPage}/>
      </Switch>
    </Router>
  );
}

export default App;
