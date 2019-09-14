import React from 'react';
import '../css/review.scss';
import profileIcon from '../img/profile-icon.svg';
import reviewStar from '../img/review-star.svg';

const Review = ({ reviewInfo: { username, stars: score, date, body } }) => {
  const createReviewStars = starCount => {
    const reviewStars = [];
    for (let count = 0; count < starCount; count++) {
      reviewStars.push(
        <img
          className="review-score-stars__star"
          key={count}
          src={reviewStar}
          alt="Review Star"
        />
      );
    }
    return reviewStars;
  };

  const formatReviewDate = date => {
    const format = { year: 'numeric', month: 'short', day: 'numeric' };
    const reviewDate = new Date(date);
    return reviewDate.toLocaleDateString('en-US', format);
  };

  return (
    <div className="review-container">
      <div className="review">
        <img
          className="review__profile-icon"
          src={profileIcon}
          alt="Profile Icon"
        />
        <div className="user-review-info">
          <h2 className="user-review-info__name">{username}</h2>
          <div className="review-score">
            <div className="review-score-stars">{createReviewStars(score)}</div>
            <span className="review-score__date">{formatReviewDate(date)}</span>
          </div>
          <p className="review__text">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
