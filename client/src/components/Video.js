import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import '../css/video.scss';
import defaultPoster from '../img/default-poster.jpg';
import reviewStar from '../img/review-star.svg';

const Video = ({ info: { Title, Year, Poster, videoID, imdbID } }) => {
  const { removeVideoItem, setRemoveVideoModal } = useContext(
    MyVideoListContext
  );
  const removeIconVisibility = removeVideoItem
    ? { visibility: 'visible' }
    : { visibility: 'hidden' };

  return (
    <li className="video">
      <button
        onClick={() => setRemoveVideoModal(true, Title, videoID)}
        style={removeIconVisibility}
        className="video__remove-icon"
      />
      <Link
        to={`/video-profile/${Title}/?imdbID=${imdbID}`}
      >
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
      </Link>
    </li>
  );
};

export default Video;
