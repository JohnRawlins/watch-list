import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import watchListLogo from '../img/watchlist-logo.svg';
import AuthError from './AuthError';
import '../css/register.scss';
import useForm from '../hooks/useForm';

const Register = () => {
  const { updateFormFields, formFields, formErrors } = useForm();
  const confirmPassword = useRef(null);
  const password = useRef(null);
  const errorLblColor = { color: 'red' };
  const errorBorder = { border: '2px solid red', outline: 'none' };

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
        <label className="register-form-label">
          <span
            className="label-text"
            style={formErrors.username.length > 0 ? errorLblColor : {}}
          >
            Username
          </span>
          <input
            className="register-form__username"
            type="text"
            name="username"
            value={formFields.username}
            onChange={updateFormFields}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            style={formErrors.username.length > 0 ? errorBorder : {}}
          />
          <AuthError fieldErrors={formErrors.username} />
        </label>
        <label className="register-form-label">
          <span
            className="label-text"
            style={formErrors.password.length > 0 ? errorLblColor : {}}
          >
            Password
          </span>
          <input
            className="register-form__password"
            type="password"
            name="password"
            value={formFields.password}
            ref={password}
            onChange={event => {
              updateFormFields(event, password, confirmPassword);
            }}
            style={formErrors.password.length > 0 ? errorBorder : {}}
          />
        </label>
        <label className="register-form-label">
          <span
            className="label-text"
            style={formErrors.confirmPassword.length > 0 ? errorLblColor : {}}
          >
            Confirm Password
          </span>
          <input
            className="register-form__confirm-password"
            type="password"
            name="confirmPassword"
            value={formFields.confirmPassword}
            onChange={event => {
              updateFormFields(event, password, confirmPassword);
            }}
            ref={confirmPassword}
            style={formErrors.confirmPassword.length > 0 ? errorBorder : {}}
          />
          <div className="register-password-errors">
            <AuthError fieldErrors={formErrors.password} />
            <AuthError fieldErrors={formErrors.confirmPassword} />
          </div>
        </label>
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
