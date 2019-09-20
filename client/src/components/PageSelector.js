import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/page-selector.scss';
import backArrow from '../img/back-arrow.svg';
import nextArrow from '../img/next-arrow.svg';

const PageSelector = ({
  numberOfPages,
  parentComponentClickEvent,
  location
}) => {
  const [dropDownMenuVisible, setDropDownMenuVisible] = useState(false);
  const pages = [];
  const videoTitle = location.search.split('&')[0];
  let currentPage = 1;
  let prevPage = false;
  let nextPage = false;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 100,
      left: 100
    });
  };

  const handlePageSelection = () => {
    setDropDownMenuVisible(prevState => !prevState);
  };

  if (location.search.split('&')[1]) {
    currentPage = Number(location.search.split('&')[1].replace('page=', ''));
  }

  prevPage = currentPage === 1 ? false : true;

  nextPage = currentPage === numberOfPages ? false : true;

  for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
    pages.push(
      <li key={pageNumber} className="page-dropdown-menu__item">
        <Link
          onClick={handleScrollToTop}
          to={`search${videoTitle}&page=${pageNumber}`}
        >
          <p className="page-dropdown-menu__text">
            <span className="page-dropdown-menu__page">page</span>
            {pageNumber}
          </p>
        </Link>
      </li>
    );
  }

  useEffect(() => {
    if (
      parentComponentClickEvent &&
      parentComponentClickEvent.id !== 'pg-selector' &&
      dropDownMenuVisible === true
    ) {
      setDropDownMenuVisible(false);
    }
    //eslint-disable-next-line
  }, [parentComponentClickEvent]);

  return (
    <div id="pg-selector" className="page-selector">
      {prevPage && (
        <Link to={`search${videoTitle}&page=${currentPage - 1}`}>
          <img
            onClick={handleScrollToTop}
            className="page-selector__back-arrow"
            src={backArrow}
            alt="Previous Page"
          />
        </Link>
      )}
      <div
        style={
          dropDownMenuVisible
            ? { visibility: 'visible' }
            : { visibility: 'hidden' }
        }
        className="page-dropdown-menu-wrapper"
      >
        <ul className="page-dropdown-menu">{pages}</ul>
      </div>

      <p className="page-selector__current-page" onClick={handlePageSelection}>
        page {currentPage} of {numberOfPages}
      </p>
      {nextPage && (
        <Link to={`search${videoTitle}&page=${currentPage + 1}`}>
          <img
            onClick={handleScrollToTop}
            className="page-selector__forward-arrow"
            src={nextArrow}
            alt="Next Page"
          />
        </Link>
      )}
    </div>
  );
};

export default PageSelector;
