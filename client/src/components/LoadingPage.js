import React, { useContext } from 'react';
import authContext from './context/auth/authContext';
import '../css/loading-page.scss';

const LoadingPage = () => {
  const { isLoading } = useContext(authContext);
  return (
    isLoading && (
      <div className="loading-page">
        <div className="loading-circles">
          <div className="loading-circles__circle"> </div>
          <div className="loading-circles__circle"> </div>
          <div className="loading-circles__circle"> </div>
        </div>
      </div>
    )
  );
};

export default LoadingPage;
