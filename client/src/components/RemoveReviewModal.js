import React, { useContext } from 'react';
import ReviewContext from './context/review/reviewContext';
import reviewStar from '../img/review-star.svg';
import '../css/remove-review-modal.scss';

const RemoveReviewModal = () => {
  const {
    deleteReviewModal: { review },
    setDeleteReviewModal,
    deleteVideoReview
  } = useContext(ReviewContext);

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

  const handleSelection = event => {
    if (event.target.value === 'no') {
      setDeleteReviewModal(false);
    }

    else{
      deleteVideoReview(review._id);
    }
  };

  return (
    <div className="remove-review-modal">
      <div className="rm-review-modal-message">
        <p className="rm-review-modal-message__text">
          Are You Sure You Want To Remove This Review?
        </p>
        <div className="rm-review-media">
          <span className="rm-review-media__date">
            {formatReviewDate(review.date)}
          </span>
          <h1 className="rm-review-media__title">{review.videoTitle}</h1>
          <div className="rm-review-score">
            {createReviewStars(review.stars)}
          </div>
        </div>
        <div className="rm-review-modal-btns" onClick={handleSelection}>
          <button className="rm-review-modal-btns__no" value="no">
            No
          </button>
          <button className="rm-review-modal-btns__yes" value="yes">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveReviewModal;
