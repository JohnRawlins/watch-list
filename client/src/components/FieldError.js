import React from 'react';
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
      {fieldErrors.length > 0 && (
        <ul className="field-error-list">{fieldErrors}</ul>
      )}
    </div>
  );
};

export default FieldError;
