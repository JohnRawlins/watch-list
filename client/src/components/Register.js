import React from 'react';
import { Link } from 'react-router-dom';
import watchListLogo from '../img/watchlist-logo.svg';
import '../css/register.scss';

const Register = () => {
  return (
    <div className="register">
      <div className="register-header">
        <img
          className="register-header__logo"
          src={watchListLogo}
          alt="Smiling TV"
        />
        <h1 className="register-header__title">Watch List</h1>
      </div>

      <form className="register-form">
        <input
          className="register-form__username"
          type="text"
          placeholder="Username"
          required
        />
        <input
          className="register-form__password"
          type="password"
          placeholder="Password"
          required
        />

        <input
          className="register-form__confirm-password"
          type="password"
          placeholder="Confirm Password"
          required
        />
        <input
          className="register-form__submit"
          type="submit"
          value="Register"
        />
      </form>

      <div className="register-links">
        <div className="register-signin">
          <p className="register-signin__message">Already Have An Account?</p>
          <Link to="/login" className="register-signin__link">
            Sign In
          </Link>
        </div>
        <Link to="/" className="register-links__guest">
          Guest
        </Link>
      </div>
    </div>
  );
};

export default Register;
