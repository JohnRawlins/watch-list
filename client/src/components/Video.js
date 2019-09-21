import React, {useContext } from 'react';
import { Link } from 'react-router-dom';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import '../css/video.scss';
import defaultPoster from '../img/default-poster.jpg';
import reviewStar from '../img/review-star.svg';

const Video = ({
  info: { Title, Year, Poster, videoID, imdbID },
  info: video
}) => {
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

  return (
    <li className="video">
      <button
        onClick={() => setRemoveVideoModal(true, Title, videoID, imdbID)}
        style={removeIconVisibility}
        className="video__remove-icon"
      />
      <Link to={`/video-profile/${Title}/?imdbID=${imdbID}`}>
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
