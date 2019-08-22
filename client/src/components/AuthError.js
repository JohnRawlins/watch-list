import React from 'react';
import '../css/auth-error.scss';
import inputErrorIcon from '../img/input-error-icon.svg';

const AuthError = ({ fieldErrors }) => {
  fieldErrors = fieldErrors.map((error, index) => {
    return (
      <li key={index.toString()} className="auth-error-list__item">
        <div className="auth-error-wrapper">
          <img
            className="auth-error-wrapper__input-status"
            src={inputErrorIcon}
            alt="Input Status Icon"
          />
          <p className="auth-error-wrapper__text">{error}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="auth-error">
      {fieldErrors.length > 0 && (
        <ul className="auth-error-list">{fieldErrors}</ul>
      )}
    </div>
  );
};

export default AuthError;
