import React from 'react';
import '../css/user-reviews.scss';
import Review from './Review';
import reviewStar from '../img/review-star.svg';

const UserReviews = () => {

  let user = [{
    name: 'john',
    starsArr: [
      <img className="review-star" src={reviewStar} alt="Review Star" />,
      <img className="review-star" src={reviewStar} alt="Review Star" />,
      <img className="review-star" src={reviewStar} alt="Review Star" />,
      <img className="review-star" src={reviewStar} alt="Review Star" />
    ],
    date: 'July 14, 2019',
    text:
      'It suffers because like most of the Cameron stories, its not a deep story and unfortunately the special effects are really strong, but they are not revolutionary.'
  },
    {
      name: 'steve',
      starsArr: [
        <img className="review-star" src={reviewStar} alt="Review Star" />,

      ],
      date: 'July 1, 2019',
      text:
        'It suffers because like most of the Cameron stories, its not a deep story and unfortunately the special effects are r'
    },
    {
      name: 'Chad',
      starsArr: [
        <img className="review-star" src={reviewStar} alt="Review Star" />,
        <img className="review-star" src={reviewStar} alt="Review Star" />,
 
      ],
      date: 'Sep 14, 2019',
      text:
        'It suffers because like most of the Cameron stories.'
    }];

  return(<div>Reviews</div>);
};

export default UserReviews;
