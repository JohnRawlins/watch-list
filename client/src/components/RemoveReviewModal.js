import React from 'react';
import star from '../img/review-star.svg';
import '../css/remove-review-modal.scss';

const RemoveReviewModal = () => {
  let mediaReview = {
    title: 'Alita: Battle Angel',
    stars: [
      <img className="rm-review-score__star" src={star} alt="Review Star" />,
      <img className="rm-review-score__star" src={star} alt="Review Star" />
    ],
    date: 'July 14, 2019'
  };
  return (
    <div className="remove-review-modal">
      <div className="rm-review-modal-message">
        <p className="rm-review-modal-message__text">
          Are You Sure You Want To Remove This Review?
        </p>
        <div className="rm-review-media">
          <span className="rm-review-media__date">{mediaReview.date}</span>
          <h1 className="rm-review-media__title">{mediaReview.title}</h1>
          <div className="rm-review-score">{mediaReview.stars}</div>
        </div>
        <div className="rm-review-modal-btns">
          <button className="rm-review-modal-btns__no">No</button>
          <button className="rm-review-modal-btns__yes">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveReviewModal;
