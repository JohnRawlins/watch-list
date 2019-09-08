import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import WriteReview from './WriteReview';
import '../css/video-profile.scss';
import rottenTomatoesIcon from '../img/rotten-tomatoes-icon.svg';
import reviewStar from '../img/review-star.svg';
import Review from './Review';
import UserReviews from './UserReviews';

const VideoProfile = ({ location }) => {
  const [video, setVideo] = useState({});


  const getVideoProfile = async () => {
    try {
      const videoProfileResponse = await fetch(
        `/api/video-profile/${location.search}`
      );

      const videoProfilePayload = await videoProfileResponse.json();

      setVideo({
        ...videoProfilePayload,
        rottenTomatoesScore: videoProfilePayload.Ratings[1].Value
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideoProfile();
  }, []);

  return (
    <div className="video-profile-container">
      <Navbar />
      {/* <WriteReview /> */}
      <div className="video-profile">
      <section className="video-details">
        <img
          className="video-details__poster"
          src={video.Poster}
          alt="video Poster"
        />
        <div className="video-details-general">
          <h1 className="video-details-general__title">{video.Title}</h1>
          <p className="video-details-general__release-date">
            {video.Released}
          </p>
          <p className="video-details-general__runtime">{video.Runtime}</p>
          <p className="video-details-general__age-rating">{video.Rated}</p>
          <div className="video-details-rt">
            <img
              className="video-details-rt__icon"
              src={rottenTomatoesIcon}
              alt="Rotten Tomatoes"
            />
            <span className="video-details-rt__rating">
              {video.rottenTomatoesScore}
            </span>
          </div>
        </div>
      </section>
      <button className="video-profile__watch-list-btn">
        Add To Watch List
      </button>
      <section className="video-plot">
        <h2 className="video-plot__heading">Plot</h2>
        <p className="video-plot__text">{video.Plot}</p>
      </section>
      <section className="video-credits">
        <h2 className="video-credits__heading">Cast and Credits</h2>
        <div className="video-actors">
          <h3 className="video-actors__heading">Actors</h3>
          <p className="video-actors__info">{video.Actors}</p>
        </div>
        <div className="video-director">
          <h3 className="video-director__heading">Director</h3>
          <p className="video-director__info">{video.Director}</p>
        </div>
      </section>
      <section className="user-reviews">
        <h2 className="user-reviews__heading">User Reviews</h2>
        <div className="video-review">
          <span className="video-review__score">{video.reviewScore}</span>
          <img
            className="video-review__star"
            src={reviewStar}
            alt="Review Star"
          />
          <button className="video-review__btn">Write A Review</button>
        </div>
        <div className="user-reviews-total">
          <p className="user-reviews-total__heading">Total</p>
          <span className="user-reviews-total__num">{video.totalReviews}</span>
        </div>
      </section>
      {/* <UserReviews/> */}
    </div>
    </div>
  );
};

export default VideoProfile;
