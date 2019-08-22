import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';
import Home from './Home.js';
import MyList from './MyList';
import AuthState from './context/auth/AuthState';
import '../css/app.scss';

function App() {
  return (
    <div className="app">
      <AuthState>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Route exact path="/mylist" component={MyList} />
          </Switch>
        </BrowserRouter>
      </AuthState>
    </div>
  );
}

export default App;
