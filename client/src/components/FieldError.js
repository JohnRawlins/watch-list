import React from 'react';
import { Transition } from 'react-spring/renderprops';
import '../css/field-error.scss';
import inputErrorIcon from '../img/input-error-icon.svg';

const FieldError = ({ fieldErrors }) => {
  fieldErrors = fieldErrors.map((error, index) => {
    return (
      <li key={index.toString()} className="field-error-list__item">
        <div className="field-error-wrapper">
          <img
            className="field-error-wrapper__input-status"
            src={inputErrorIcon}
            alt="Input Status Icon"
          />
          <p className="field-error-wrapper__text">{error}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="field-error">
      <Transition
        items={fieldErrors}
        keys={error => error.key}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {error => props => (
          <ul style={props} className="field-error-list">
            {error}
          </ul>
        )}
      </Transition>
    </div>
  );
};

export default FieldError;
