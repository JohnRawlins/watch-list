import React from 'react';
import '../css/form-error.scss';
import formErrorIcon from '../img/form-error-icon.svg';

const FormError = ({ formErrors }) => {
  formErrors = formErrors.map((error, index) => {
    return (
      <li key={index.toString()} className="form-error-list__item">
        {error}
      </li>
    );
  });

  return (
    formErrors.length > 0 && (
      <ul className="form-error">
        <img
          className="form-error__icon"
          src={formErrorIcon}
          alt="Form Error Icon"
        />
        <ul className="form-error-list">{formErrors}</ul>
      </ul>
    )
  );
};

export default FormError;
