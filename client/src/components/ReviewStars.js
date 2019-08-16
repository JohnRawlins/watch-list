import React from 'react';
import Star from './Star';
import { useState } from 'react';

const ReviewStars = () => {
  const selected = '#336E6B';
  const deselected = '#B5B3B3';
  const numberOfStars = 5;

  const getStarNum = star => {
    return Number(star.id.split('-')[1]);
  };

  let handleReviewStars = event => {
    let score = reviewStars.map((star, index) => {
      let starNum = getStarNum(event.target);
      let starColor = starNum >= index ? selected : deselected;
      return (
        <div
          id={`star-${index}`}
          className="star-wrapper"
          key={index}
          onClick={handleReviewStars}
        >
          <Star id={index} color={starColor} />
        </div>
      );
    });

    setReviewStars(score);
  };

  const [reviewStars, setReviewStars] = useState(() => {
    let starArray = [];
    for (let index = 0; index < numberOfStars; index++) {
      starArray.push(
        <div
          id={`star-${index}`}
          className="star-wrapper"
          key={index}
          onClick={handleReviewStars}
        >
          <Star id={index} color={deselected} />
        </div>
      );
    }
    return starArray;
  });

  return <div className="score__review-stars">{reviewStars}</div>;
};

export default ReviewStars;
