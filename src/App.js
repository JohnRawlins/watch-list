import React from 'react';
import SignIn from './components/SignIn.js';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
