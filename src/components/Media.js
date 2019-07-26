import React from 'react';
import '../css/Media.scss';
import defaultPoster from '../img/default-poster.svg';
import reviewStar from '../img/review-star.svg';

const Media = () => {
  return (
    <div className="media">
      <div className="media-poster">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTExODIwOTUxNzFeQTJeQWpwZ15BbWU4MDE5MDA0MTcz._V1_SX300.jpg"
          className="media-poster__img"
          alt="Media Poster"
        />
      </div>
      <div className="media-info">
        <h2 className="media-info__name">The Punisher Netflix</h2>
        <p className="media-info__year">2017-2019</p>
        <div className="media-rating">
          <img
            className="media-rating__star"
            src={reviewStar}
            alt="Review Star"
          />
          <p className="media-rating__number">
            <span className="media-rating__numerator">4</span>/
            <span className="media-rating__denominator">5</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Media;
