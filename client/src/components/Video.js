import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import '../css/video.scss';
import defaultPoster from '../img/default-poster.jpg';
import reviewStar from '../img/review-star.svg';

const Video = ({
  info: { Title, Year, Poster, videoID, imdbID },
  info: video
}) => {
  const [videoPosterError, setVideoPosterError] = useState(false);
  const { removeVideoItem, setRemoveVideoModal } = useContext(
    MyVideoListContext
  );
  const removeIconVisibility = removeVideoItem
    ? { visibility: 'visible' }
    : { visibility: 'hidden' };

  let userReviewScore = video.userReviewScore;

  if (userReviewScore) {
    userReviewScore = Number(video.userReviewScore);
  }

  const displayProperty =
    userReviewScore === undefined ? { display: 'none' } : {};

  let encodedVideoTitle = Title.replace('?', '');

  encodedVideoTitle.replace(/%/g, '%25');

  encodedVideoTitle = encodeURI(encodedVideoTitle);

  return (
    <li className="video">
      <button
        onClick={() => setRemoveVideoModal(true, Title, videoID, imdbID)}
        style={removeIconVisibility}
        className="video__remove-icon"
      />
      <Link to={`/video-profile/${encodedVideoTitle}/${imdbID}`}>
        <div className="video-Poster">
          <img
            src={videoPosterError ? defaultPoster : Poster}
            className="video-poster__img"
            alt="Video Poster"
            onError={() => {
              setVideoPosterError(true);
            }}
          />
        </div>
        <div className="video-info">
          <h2 className="video-info__name">{Title}</h2>
          <p className="video-info__year">{Year}</p>
          <div className="video-rating" style={displayProperty}>
            <img
              className="video-rating__star"
              src={reviewStar}
              alt="Review Star"
            />
            <p className="video-rating__number">
              {userReviewScore < 1 ? (
                'No Reviews'
              ) : (
                <>
                  <span className="video-rating__numerator">
                    {userReviewScore}
                  </span>
                  <span className="video-rating__denominator">5</span>
                </>
              )}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Video;
