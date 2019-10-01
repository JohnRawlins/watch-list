import React from 'react';
import { Link } from 'react-router-dom';
import frownIcon from '../img/frown-face.svg';
import '../css/not-found.scss';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <img className="not-found__icon" src={frownIcon} alt="Frown Face" />
        <h1 className="not-found__status-code">404</h1>
        <p className="not-found__status">Page not found</p>
        <p className="not-found__msg">
          The page you are looking for doesn't exist or an other error has
          occurred
        </p>
        <Link className="not-found__link" to="/login">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
