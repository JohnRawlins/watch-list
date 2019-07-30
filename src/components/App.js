import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn.js';
import Register from './Register.js';
import Home from './Home.js';
import MediaProfile from '../components/MediaProfile';
import '../css/app.scss';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={MediaProfile}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
