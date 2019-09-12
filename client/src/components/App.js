import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';
import Home from './Home.js';
import MyWatchList from './MyWatchList';
import VideoProfile from './VideoProfile';
import AuthState from './context/auth/AuthState';
import MyVideoListState from './context/my-video-list/MyVideoListState';
import ReviewState from './context/review/ReviewState';
import '../css/app.scss';

function App() {
  return (
    <div className="app">
      <AuthState>
        <MyVideoListState>
          <ReviewState>
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
          </ReviewState>
        </MyVideoListState>
      </AuthState>
    </div>
  );
}

export default App;
