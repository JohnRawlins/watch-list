import React from 'react';
import { Link } from 'react-router-dom';
import '../css/signin.scss';
import watchListLogo from '../img/watchlist-logo.svg';

const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin-header">
        <img
          className="signin-header__logo"
          src={watchListLogo}
          alt="Smiling TV"
        />
        <h1 className="signin-header__title">Watch List</h1>
      </div>

      <form className="signin-form">
        <input
          className="signin-form__username"
          type="text"
          placeholder="Username"
        />
        <input
          className="signin-form__password"
          type="password"
          placeholder="Password"
        />
        <input className="signin-form__submit" type="submit" value="Sign In" />
      </form>

      <div className="signin-links">
        <div className="signin-signup">
          <p className="signin-signup__message">New To Watch List?</p>
          <Link to="/register" className="signin-signup__link">
            Sign Up Now
          </Link>
        </div>
        <Link to="/" className="signin-links__guest">
          Guest
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
