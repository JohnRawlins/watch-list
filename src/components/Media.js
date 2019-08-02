import React from 'react';
import '../css/media.scss';
import defaultPoster from '../img/default-poster.svg';
import reviewStar from '../img/review-star.svg';

const Media = () => {
  return (
    <div className="media">
      <div className="media-poster">
        <img
          src=""
          className="media-poster__img"
          alt="Media Poster"
        />
      </div>
      <div className="media-info">
        <h2 className="media-info__name"></h2>
        <p className="media-info__year"></p>
        <div className="media-rating">
          <img
            className="media-rating__star"
            src=""
            alt="Review Star"
          />
          <p className="media-rating__number">
            {/* <span className="media-rating__numerator">4</span>/
            <span className="media-rating__denominator">5</span> */}
            No Reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default Media;
