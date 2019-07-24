import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn.js';
import '../css/app.scss';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
