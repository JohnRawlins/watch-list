import React from 'react';
import reviewStar from '../img/review-star.svg';
import '../css/my-review-item.scss';

const MyReviewItem = ({ reviewDetails: { videoTitle, stars, date, body } }) => {
  const formatReviewDate = date => {
    const format = { year: 'numeric', month: 'short', day: 'numeric' };
    const reviewDate = new Date(date);
    return reviewDate.toLocaleDateString('en-US', format);
  };

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

  return (
    <li className="my-review-item">
      <button className="my-review-item__exit-icon" />
      <h1 className="my-review-item__media-title">{videoTitle}</h1>
      <div className="my-review-item-details">
        <div className="my-review-item-stars">{createReviewStars(stars)}</div>
        <span className="my-review-item-details__date">
          {formatReviewDate(date)}
        </span>
      </div>
      <p className="my-review-item__review-text">{body}</p>
      <div className="my-review-item-btns">
        <button className="my-review-item-btns__edit">Edit</button>
      </div>
    </li>
  );
};

export default MyReviewItem;
