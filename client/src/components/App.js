import React from 'react';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';
import Home from './Home.js';
import MyWatchList from './MyWatchList';
import VideoProfile from './VideoProfile';
import MyReviews from './MyReviews';
import AuthState from './context/auth/AuthState';
import MyVideoListState from './context/my-video-list/MyVideoListState';
import ReviewState from './context/review/ReviewState';
import InfoModal from './InfoModal';
import '../css/app.scss';

const App = () => {
  return (
    <div className="app">
      <AuthState>
        <MyVideoListState>
          <ReviewState>
            <BrowserRouter>
              <InfoModal />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/my-watch-list" component={MyWatchList} />
                <PrivateRoute path="/my-reviews" component={MyReviews} />
                <Route path="/video-profile" component={VideoProfile} />
                <Route path="/search" component={Home} />
              </Switch>
            </BrowserRouter>
          </ReviewState>
        </MyVideoListState>
      </AuthState>
    </div>
  );
};

export default App;
