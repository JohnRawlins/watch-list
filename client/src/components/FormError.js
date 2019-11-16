import React from 'react';
import { Transition } from 'react-spring/renderprops';
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
    <Transition
      items={formErrors}
      keys={error => error.key}
      from={{ opacity: 0, transform: 'scale(0)' }}
      enter={{ opacity: 1, transform: 'scale(1)' }}
      leave={{ opacity: 0, transform: 'scale(0)' }}
    >
      {error => props => (
        <div className="form-error">
          <img
            className="form-error__icon"
            src={formErrorIcon}
            alt="Form Error Icon"
          />
          <ul style={props} className="form-error-list">
            {error}
          </ul>
        </div>
      )}
    </Transition>
  );
};

export default FormError;
