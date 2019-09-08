import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';
import Home from './Home.js';
import MyWatchList from './MyWatchList';
import VideoProfile from './VideoProfile';
import AuthState from './context/auth/AuthState';
import MyListState from './context/my-video-list/MyVideoListState';
import '../css/app.scss';

function App() {
  return (
    <div className="app">
      <AuthState>
        <MyListState>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/my-watch-list" component={MyWatchList} />
              <Route path="/video-profile" component={VideoProfile} />
              <Route path="/search" component={Home} />
            </Switch>
          </BrowserRouter>
        </MyListState>
      </AuthState>
    </div>
  );
}

export default App;
