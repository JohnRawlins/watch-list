import React, { useEffect, useState, useContext } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import ReviewContext from './context/review/reviewContext';
import Navbar from './Navbar';
import defaultPoster from '../img/default-poster.jpg';
import WriteReview from './WriteReview';
import '../css/video-profile.scss';
import defaultScore from '../img/popcorn.svg';
import reviewStar from '../img/review-star.svg';
import freshScore from '../img/fresh-score.png';
import rottenScore from '../img/rotten-score.png';
import UserReviews from './UserReviews';
import VideoProfilePlaceHolder from './VideoProfilePlaceHolder';

const VideoProfile = ({ location }) => {
  const [video, setVideo] = useState({});

  const { addVideoToWatchList, infoModalMsg } = useContext(MyVideoListContext);

  const {
    setWriteReviewModal,
    writeReviewModal,
    getVideoReviews,
    userReviews
  } = useContext(ReviewContext);

  const [isLoading, setLoading] = useState(true);

  const getVideoProfile = async () => {
    let rottenTomatoesScore;
    try {
      const videoProfileResponse = await fetch(
        `/api/video-profile/${location.search}`
      );

      const videoProfilePayload = await videoProfileResponse.json();

      if (
        videoProfilePayload.Ratings.find(
          review => review.Source === 'Rotten Tomatoes'
        )
      ) {
        rottenTomatoesScore = Number(
          videoProfilePayload.Ratings[1].Value.replace('%', '')
        );
      } else {
        rottenTomatoesScore = 'No Critic Reviews';
      }

      videoProfilePayload.rottenTomatoesScore = rottenTomatoesScore;

      getVideoReviews(videoProfilePayload.imdbID);

      setVideo({ ...videoProfilePayload });

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideoProfile();
    //eslint-disable-next-line
  }, [infoModalMsg]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="video-profile-container">
      <Navbar />
      {writeReviewModal.visible && <WriteReview videoInfo={video} />}
      {isLoading ? (
        <VideoProfilePlaceHolder />
      ) : (
        <div className="video-profile">
          <section className="video-details">
            <img
              className="video-details__poster"
              src={video.Poster}
              alt="video Poster"
              onError={event => {
                event.target.src = defaultPoster;
              }}
            />
            <div className="video-details-general">
              <h1 className="video-details-general__title">{video.Title}</h1>
              <p className="video-details-general__release-date">
                {video.Released}
              </p>
              <p className="video-details-general__runtime">{video.Runtime}</p>
              <p className="video-details-general__age-rating">{video.Rated}</p>
              <div className="video-details-rt">
                <p className="video-details-rt__tomatometer-heading">
                  Tomatometer
                </p>
                <div className="tomatometer">
                  <img
                    className="tomatometer__icon"
                    src={
                      video.rottenTomatoesScore >= 60
                        ? freshScore
                        : video.rottenTomatoesScore < 60
                        ? rottenScore
                        : defaultScore
                    }
                    alt="Rotten Tomatoes"
                  />
                  <span className="tomatometer__rating">
                    {video.rottenTomatoesScore}
                    {typeof video.rottenTomatoesScore === 'number' ? '%' : ''}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <button
            onClick={() => addVideoToWatchList(video)}
            className="video-profile__watch-list-btn"
          >
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
            <div className="video-review-container">
              <div className="video-review">
                <div className="video-review-score-container">
                  <span className="video-review__score">
                    {userReviews.userReviewScore}
                  </span>
                  <div className="user-reviews-total">
                    <p className="user-reviews-total__heading">Total</p>
                    <span className="user-reviews-total__num">
                      {userReviews.totalUserReviews}
                    </span>
                  </div>
                </div>
                <img
                  className="video-review__star"
                  src={reviewStar}
                  alt="Review Star"
                />
                <button
                  onClick={() => setWriteReviewModal(true)}
                  className="video-review__btn"
                >
                  Write A Review
                </button>
              </div>
            </div>
            <UserReviews videoReviews={userReviews} />
          </section>
        </div>
      )}
    </div>
  );
};

export default VideoProfile;
