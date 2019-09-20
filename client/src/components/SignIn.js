import React, { useContext, useEffect } from 'react';
import useForm from '../hooks/useForm.js';
import AuthContext from './context/auth/authContext.js';
import { Link } from 'react-router-dom';
import FormError from './FormError';
import '../css/sign-in.scss';
import watchListLogo from '../img/watchlist-logo.svg';

const SignIn = ({ history }) => {
  const {
    updateFormFields,
    formFields: { username, password },
    formFields
  } = useForm();

  const {
    signInUser,
    signInErrors,
    isAuthenticated,
    user,
    userToken,
    loadUser,
    clearFormErrors
  } = useContext(AuthContext);

  const handleSignIn = event => {
    event.preventDefault();
    signInUser({ username: username.value, password: password.value });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      history.push('/');
    }

    if (userToken && !isAuthenticated) {
      loadUser(userToken);
    }

    return () => clearFormErrors();
  }, [isAuthenticated, user, formFields]);

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

      <FormError formErrors={signInErrors} />

      <form className="signin-form" onSubmit={handleSignIn}>
        <label className="signin-form-label">
          <span className="signin-form-label__text">Username</span>
          <input
            className="signin-form__username"
            type="text"
            name="username"
            value={username.value}
            onChange={updateFormFields}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </label>

        <label className="signin-form-label">
          <span className="signin-form-label__text">Password</span>
          <input
            className="signin-form__password"
            type="password"
            name="password"
            value={password.value}
            onChange={updateFormFields}
          />
        </label>
        <input
          className="signin-form__submit"
          type="submit"
          value="Sign In"
          disabled={!username.value || !password.value}
        />
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
