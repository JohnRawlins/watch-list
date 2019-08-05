import React from 'react';
import star from '../img/review-star.svg';
import '../css/my-review-item.scss';

const MyReviewItem = () => {
  let data = {
    title: 'Alita: Battle Angel',
    stars: [
      <img className="myreviewitem-stars__item" src={star} alt="Review Star" />,
      <img className="myreviewitem-stars__item" src={star} alt="Review Star" />
    ],
    date: 'July 14, 2019',
    review:
      'It suffers because like most of the Cameron stories, its not a deep story and unfortunately the special effects are really strong, but they are not revolutionary.'
  };

  return (
    <div className="myreviewitem">
      <button className="myreviewitem__exit-icon" />
      <h1 className="myreviewitem__media-title">{data.title}</h1>
      <div className="myreviewitem-details">
        <div className="myreviewitem-stars">{data.stars}</div>
        <span className="myreviewitem-details__date"> {data.date}</span>
      </div>
      <p className="myreviewitem__review-text">{data.review}</p>
      <div className="myreviewitem-btns">
        <button className="myreviewitem-btns__edit">Edit</button>
      </div>
    </div>
  );
};

export default MyReviewItem;
