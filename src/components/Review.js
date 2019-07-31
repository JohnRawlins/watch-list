import React from 'react';
import '../css/review.scss';
import profileIcon from '../img/profile-icon.svg';
import reviewStar from '../img/review-star.svg';

const Review = ({name,starsArr,date,text}) => {

  return (
    <div className="review-container">
      <div className="review">
        <img
          className="review__profile-icon"
          src={profileIcon}
          alt="Profile Icon"
        />
        <div className="user-review-info">
          <h2 className="user-review-info__name">{name}</h2>
          <div className="review-score">
            <div className="review-score__stars">{starsArr}</div>
            <span className="review-score__date">{date}</span>
          </div>
        </div>
      </div>
      <p className="review__text">{text}</p>
    </div>
  );
};

export default Review;
