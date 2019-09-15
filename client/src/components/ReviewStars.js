import React, { useContext, useEffect } from 'react';
import ReviewContext from './context/review/reviewContext';
import Star from './Star';
import { useState } from 'react';

const ReviewStars = () => {
  const selected = '#336E6B';
  const deselected = '#B5B3B3';
  const numberOfStars = 5;

  const {
    setScoreAndDescription,
    writeReviewModal: { review }
  } = useContext(ReviewContext);

  const getStarNum = star => {
    return Number(star.id.split('-')[1]);
  };

  const [reviewStars, setReviewStars] = useState(() => {
    const starsArray = [];

    if (review) {
      for (let currIndex = 0; currIndex < numberOfStars; currIndex++) {
        starsArray.push(
          <div
            id={`star-${currIndex}`}
            className="star-wrapper"
            key={currIndex}
          >
            <Star
              id={currIndex}
              color={currIndex < review.stars ? selected : deselected}
            />
          </div>
        );
      }
      return { starsArray, selectedStar: review.stars };
    } else
      for (let currIndex = 0; currIndex < numberOfStars; currIndex++) {
        starsArray.push(
          <div
            id={`star-${currIndex}`}
            className="star-wrapper"
            key={currIndex}
          >
            <Star id={currIndex} color={deselected} />
          </div>
        );
      }
    return { starsArray };
  });

  let handleReviewStars = event => {
    let selectedStar = getStarNum(event.target);
    if (Number.isNaN(selectedStar)) return;
    const score = reviewStars.starsArray.map((star, currIndex) => {
      const starColor = selectedStar >= currIndex ? selected : deselected;
      return (
        <div id={`star-${currIndex}`} className="star-wrapper" key={currIndex}>
          <Star id={currIndex} color={starColor} />
        </div>
      );
    });
    setReviewStars({ starsArray: score, selectedStar: selectedStar + 1 });
  };

  useEffect(() => {
    setScoreAndDescription(reviewStars.selectedStar);
  }, [reviewStars]);

  return (
    <div className="score__review-stars" onClick={handleReviewStars}>
      {reviewStars.starsArray}
    </div>
  );
};

export default ReviewStars;
