import React from 'react';
import '../css/write-review.scss';
import ReviewStars from './ReviewStars';

const WriteReview = () => {
  return (
    <div className="write-review-modal">
      <div className="write-review-container">
        <div className="write-review">
          <h1 className="write-review__media-title">Alita: Battle Angel</h1>
          <div className="score">
            <h2 className="score__heading">Select Star To Rate</h2>
            <ReviewStars />
            <span className="score__text">Ok</span>
          </div>
          <label className="write-review__name-label">
            Enter name to show with your review
            <textarea
              className="write-review__name-txt-area"
              placeholder="Name"
            />
          </label>
          <textarea
            className="write-review__review-txt-area"
            placeholder="Tell others what you think about this movie"
          />
          <div className="review-btns">
            <button className="review-btns__cancel">Cancel</button>
            <button className="review-btns__submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
