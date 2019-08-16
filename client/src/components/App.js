import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';
import Home from './Home.js';
import MyReviews from './MyReviews';
import WriteReview from './WriteReview'
import MyList from './MyList';
import VideoProfile from './VideoProfile';
import '../css/app.scss';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route exact path="/mylist" component={MyList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
