import React from 'react';
import star from '../img/review-star.svg';
import '../css/my-review-item.scss';

const MyReviewItem = ({data:{title,stars,date,review}}) => {

  return (
    <li className="myreviewitem">
      <button className="myreviewitem__exit-icon" />
      <h1 className="myreviewitem__media-title">{title}</h1>
      <div className="myreviewitem-details">
        <div className="myreviewitem-stars">{stars}</div>
        <span className="myreviewitem-details__date"> {date}</span>
      </div>
      <p className="myreviewitem__review-text">{review}</p>
      <div className="myreviewitem-btns">
        <button className="myreviewitem-btns__edit">Edit</button>
      </div>
    </li>
  );
};

export default MyReviewItem;
