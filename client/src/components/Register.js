import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import watchListLogo from '../img/watchlist-logo.svg';
import AuthError from './AuthError';
import '../css/register.scss';

const Register = () => {
  const [registerFields, setRegisterFields] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [registerFieldErrors, setRegisterFieldErrors] = useState({
    username: [],
    password: [],
    confirmPassword: []
  });

  const [registerFieldHighlight, setRegisterFieldHighlight] = useState({
    username: false,
    password: false,
    confirmPassword: false
  });

  const checkInputValues = (fieldName, fieldValue) => {
    switch (fieldName) {
      case 'username': {
        const inputErrors = [];
        if (fieldValue.includes(' ')) {
          inputErrors.push('Username cannot contain any spaces');
        }

        if (fieldValue.length < 1) {
          inputErrors.push('Username is required');
        }
        setRegisterFieldErrors({
          ...registerFieldErrors,
          username: inputErrors
        });
        if (registerFieldErrors.username.length > 0) {
          setRegisterFieldHighlight({
            ...registerFieldHighlight,
            username: true
          });
        } else {
          setRegisterFieldHighlight({
            ...registerFieldHighlight,
            username: false
          });
        }

        break;
      }

      case 'password': {
        const inputErrors = [];

        if (fieldValue.includes(' ')) {
          inputErrors.push('Password cannot contain any spaces');
        }

        if (fieldValue.length < 1) {
          inputErrors.push('Password is required');
        }

        if (fieldValue.length < 6) {
          inputErrors.push('Password needs to have a minimum of 6 characters');
        }

        if (
          fieldValue !== registerFields.confirmPassword &&
          registerFields.confirmPassword.length > 1
        ) {
          setRegisterFieldErrors({
            ...registerFieldErrors,
            password: inputErrors,
            confirmPassword: ['Passwords do not match']
          });
        } else
          setRegisterFieldErrors({
            ...registerFieldErrors,
            password: inputErrors,
            confirmPassword: []
          });

        if (inputErrors.length > 0) {
          setRegisterFieldHighlight({
            ...registerFieldHighlight,
            password: true
          });
        } else {
          setRegisterFieldHighlight({
            ...registerFieldHighlight,
            password: false,
            confirmPassword:false
          });
        }

        break;
      }

      case 'confirmPassword': {
        const inputErrors = [];

        if (fieldValue !== registerFields.password) {
          inputErrors.push('Passwords do not match');
        }
        setRegisterFieldErrors({
          ...registerFieldErrors,
          confirmPassword: inputErrors
        });

        if (inputErrors.length > 0) {
          setRegisterFieldHighlight({
            ...registerFieldHighlight,
            confirmPassword: true
          });
        } else {
          setRegisterFieldHighlight({
            ...registerFieldHighlight,
            confirmPassword: false
          });
        }

        break;
      }
    }
  };

  const handleFormFields = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    switch (fieldName) {
      case 'username':
        setRegisterFields({ ...registerFields, username: fieldValue });
        checkInputValues(fieldName, fieldValue);
        break;

      case 'password':
        setRegisterFields({ ...registerFields, password: fieldValue });
        checkInputValues(fieldName, fieldValue);
        break;

      case 'confirmPassword':
        setRegisterFields({ ...registerFields, confirmPassword: fieldValue });
        checkInputValues(fieldName, fieldValue);
        break;
    }
  };

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
            style={registerFieldHighlight.username ? { color: 'red' } : {}}
          >
            Username
          </span>
          <input
            className="register-form__username"
            type="text"
            name="username"
            value={registerFields.username}
            onChange={handleFormFields}
            style={
              registerFieldHighlight.username ? { border: '2px solid red' } : {}
            }
          />
          <AuthError fieldErrors={registerFieldErrors.username} />
        </label>
        <label className="register-form-label">
          <span
            className="label-text"
            style={registerFieldHighlight.password ? { color: 'red' } : {}}
          >
            Password
          </span>
          <input
            className="register-form__password"
            type="password"
            name="password"
            value={registerFields.password}
            onChange={handleFormFields}
            style={
              registerFieldHighlight.password ? { border: '2px solid red' } : {}
            }
          />
        </label>
        <label className="register-form-label">
          <span
            className="label-text"
            style={registerFieldHighlight.confirmPassword ? { color: 'red' } : {}}
          >
            Confirm Password
          </span>
          <input
            className="register-form__confirm-password"
            type="password"
            name="confirmPassword"
            value={registerFields.confirmPassword}
            onChange={handleFormFields}
            style={
              registerFieldHighlight.confirmPassword ? { border: '2px solid red' } : {}
            }
          />
          <div className="register-password-errors">
            <AuthError fieldErrors={registerFieldErrors.password} />
            <AuthError fieldErrors={registerFieldErrors.confirmPassword} />
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
