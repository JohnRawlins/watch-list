import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn.js';
import Register from './Register.js';
import Home from './Home.js';
import MyReviews from './MyReviews.js';
import WriteReview from './WriteReview.js'
import MyList from './MyList.js';
import VideoProfile from '../components/VideoProfile';
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
