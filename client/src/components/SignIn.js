import React, { useContext, useEffect } from 'react';
import ImageGallery from './ImageGallery';
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
    <div className="sign-in-container">
      <div className="sign-in-layout">
        <ImageGallery />
        <div className="sign-in">
          <div className="sign-in-header">
            <img
              className="sign-in-header__logo"
              src={watchListLogo}
              alt="Smiling TV"
            />
            <h1 className="sign-in-header__title">Watch List</h1>
          </div>

          <FormError formErrors={signInErrors} />

          <form className="sign-in-form" onSubmit={handleSignIn}>
            <label className="sign-in-form-label">
              <span className="sign-in-form-label__text">Username</span>
              <input
                className="sign-in-form__username"
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

            <label className="sign-in-form-label">
              <span className="sign-in-form-label__text">Password</span>
              <input
                className="sign-in-form__password"
                type="password"
                name="password"
                value={password.value}
                onChange={updateFormFields}
              />
            </label>
            <input
              className="sign-in-form__submit"
              type="submit"
              value="Sign In"
              disabled={!username.value || !password.value}
            />
          </form>

          <div className="sign-in-links">
            <div className="sign-in-signup">
              <p className="sign-in-signup__message">New To Watch List?</p>
              <Link to="/register" className="sign-in-signup__link">
                Sign Up Now
              </Link>
            </div>
            <Link to="/" className="sign-in-links__guest">
              Guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
