import React, { useState, useContext } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import '../css/video.scss';
import defaultPoster from '../img/default-poster.jpg';
import reviewStar from '../img/review-star.svg';

const Video = ({ info: { Title, Year, Poster } }) => {
  const { removeVideoItem } = useContext(MyVideoListContext);
  const removeIconVisibility = removeVideoItem
    ? { visibility: 'visible' }
    : { visibility: 'hidden' };

  return (
    <li className="video">
      <button style={removeIconVisibility} className="video__remove-icon" />
      <div className="video-Poster">
        <img
          src={Poster}
          className="video-poster__img"
          alt="video Poster"
          onError={event => {
            event.target.src = defaultPoster;
          }}
        />
      </div>
      <div className="video-info">
        <h2 className="video-info__name">{Title}</h2>
        <p className="video-info__year">{Year}</p>
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
