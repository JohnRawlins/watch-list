import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/page-selector.scss';
import backArrow from '../img/back-arrow.svg';
import nextArrow from '../img/next-arrow.svg';
import dropDownArrow from '../img/drop-down-arrow.svg';

const PageSelector = ({ numberOfPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [];

  for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
    pages.push(
      <li key={pageNumber} className="page-dropdown-menu__item">
        <Link>
          <p className="page-dropdown-menu__text">
            <span className="page-dropdown-menu__page">Page</span>
            {pageNumber}
          </p>
        </Link>
      </li>
    );
  }

  return (
    <div className="page-selector">
      <img
        className="page-selector__back-arrow"
        src={backArrow}
        alt="Previous Page"
      />
      <div className="page-dropdown-menu-wrapper">
        <ul className="page-dropdown-menu">{pages}</ul>
      </div>

      <p className="page-selector__current-page">page 1 of {numberOfPages}</p>
      <img
        className="page-selector__forward-arrow"
        src={nextArrow}
        alt="Next Page"
      />
      <img
        className="page-selector__dropdown-arrow"
        src={dropDownArrow}
        alt="Drop Down Arrow"
      />
    </div>
  );
};

export default PageSelector;
