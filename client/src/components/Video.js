import React, { useState } from 'react';
import '../css/video.scss';
import defaultPoster from '../img/default-poster.svg';
import reviewStar from '../img/review-star.svg';

const Video = ({ info: { title, year, poster } }) => {
  const [imgError, setImgError] = useState({
    status: false,
    style: {}
  });

  return (
    <li className="video">
      <button className="video__remove-icon" />
      <div className="video-poster">
        <img
          style={imgError.style}
          src={imgError.status ? defaultPoster : poster}
          className="video-poster__img"
          alt="video Poster"
          onError={() =>
            setImgError({
              status: true,
              style: { width: '70px', objectFit: 'contain' }
            })
          }
        />
      </div>
      <div className="video-info">
        <h2 className="video-info__name">{title}</h2>
        <p className="video-info__year">{year}</p>
        <div className="video-rating">
          <img
            className="video-rating__star"
            src={reviewStar}
            alt="Review Star"
          />
          <p className="video-rating__number">
            {/* <span className="video-rating__numerator">4</span>/
            <span className="video-rating__denominator">5</span> */}
            No Reviews
          </p>
        </div>
      </div>
    </li>
  );
};

export default Video;
