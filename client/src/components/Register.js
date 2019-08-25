import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import watchListLogo from '../img/watchlist-logo.svg';
import FieldError from './FieldError';
import FormError from './FormError';
import '../css/register.scss';
import useForm from '../hooks/useForm';
import formValidator from '../hooks/formValidator';
import AuthContext from './context/auth/authContext';

const Register = () => {
  const { registerUser, registerErrors } = useContext(AuthContext);
  const {
    updateFormFields,
    formFields,
    formFields: {
      username: { value: username },
      password: { value: password }
    },
    submitDisabled
  } = useForm(formValidator);
  const errorBorder = { border: '2px solid red', outline: 'none' };

  const handleSubmit = event => {
    event.preventDefault();
    registerUser({ username, password });
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
      <FormError formErrors={registerErrors} />
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-form-label">
          <span className="label-text">Username</span>
          <input
            className="register-form__username"
            type="text"
            name="username"
            value={formFields.username.value}
            onChange={updateFormFields}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            style={formFields.username.errors.length > 0 ? errorBorder : {}}
          />
          <FieldError fieldErrors={formFields.username.errors} />
        </label>
        <label className="register-form-label">
          <span className="label-text">Password</span>
          <input
            className="register-form__password"
            type="password"
            name="password"
            value={formFields.password.value}
            onChange={updateFormFields}
            style={formFields.password.errors.length > 0 ? errorBorder : {}}
          />
          <FieldError fieldErrors={formFields.password.errors} />
        </label>
        <label className="register-form-label">
          <span className="label-text">Confirm Password</span>
          <input
            className="register-form__confirm-password"
            type="password"
            name="confirmPassword"
            value={formFields.confirmPassword.value}
            onChange={updateFormFields}
            style={
              formFields.confirmPassword.errors.length > 0 ? errorBorder : {}
            }
          />
          <FieldError fieldErrors={formFields.confirmPassword.errors} />
          <div className="register-password-errors" />
        </label>
        <input
          className="register-form__submit"
          type="submit"
          value="Register"
          disabled={submitDisabled}
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
