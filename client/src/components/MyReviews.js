import React from 'react';
import Navbar from './Navbar';
import MyReviewList from './MyReviewList';
import searchIcon from '../img/search-icon.svg';
import star from '../img/review-star.svg';
import MyReviewItem from './MyReviewItem';
import RemoveReviewModal from './RemoveReviewModal';
import '../css/myreviews.scss';

const MyReviews = () => {


  return (
    <div className="myreviews">
      <Navbar />
      <header className="myreviews-header">
        <h1 className="myreviews-header__title">My Reviews</h1>
        <select className="myreviews-sort">
          <option className="myreviews-sort__ascending">Title A to Z</option>
          <option className="myreviews-sort__descending">Title Z to A</option>
        </select>
      </header>
      <form className="search">
        <input className="search__input" type="text" placeholder="Search" />
        <button className="search__btn" type="submit">
          <img
            className="search__btn-img"
            src={searchIcon}
            alt="Search Button"
          />
        </button>
      </form>
      {/* <MyReviewList />
      <MyReviewItem /> */}
      {/* <RemoveReviewModal/> */}
    </div>
  );
};

export default MyReviews;
