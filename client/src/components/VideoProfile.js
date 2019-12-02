import React, { useEffect, useState, useContext } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import ReviewContext from './context/review/reviewContext';
import Navbar from './Navbar';
import defaultPoster from '../img/default-poster.jpg';
import WriteReview from './WriteReview';
import '../css/video-profile.scss';
import reviewStar from '../img/review-star.svg';
import freshScore from '../img/fresh-score.png';
import rottenScore from '../img/rotten-score.png';
import UserReviews from './UserReviews';
import VideoProfilePlaceHolder from './VideoProfilePlaceHolder';

const VideoProfile = ({ location }) => {
  const [video, setVideo] = useState({});
  const [videoPosterError, setVideoPosterError] = useState(false);
  const { addVideoToWatchList, infoModalMsg } = useContext(MyVideoListContext);

  const {
    setWriteReviewModal,
    writeReviewModal,
    getVideoReviews,
    userReviews,
    clearVideoProfileReviews
  } = useContext(ReviewContext);

  const [isLoading, setLoading] = useState(true);

  const getVideoProfile = async () => {
    let rottenTomatoesScore;
    try {
      const videoProfileResponse = await fetch(`/api${location.pathname}`);

      const videoProfilePayload = await videoProfileResponse.json();
      const rottenTomatoesReview = videoProfilePayload.Ratings.find(
        review => review.Source === 'Rotten Tomatoes'
      );
      if (rottenTomatoesReview) {
        rottenTomatoesScore = Number(
          rottenTomatoesReview.Value.replace('%', '')
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
    return clearVideoProfileReviews;

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
          <div className="video-details-container">
            <section className="video-details">
              <img
                className="video-details__poster"
                src={videoPosterError ? defaultPoster : video.Poster}
                alt="video Poster"
                onError={() => {
                  setVideoPosterError(true);
                }}
              />
              <div className="video-details-general">
                <h1 className="video-details-general__title">{video.Title}</h1>
                <div className="tomatometer">
                  {video.rottenTomatoesScore !== 'No Critic Reviews' && (
                    <img
                      className="tomatometer__icon"
                      src={
                        video.rottenTomatoesScore >= 60
                          ? freshScore
                          : rottenScore
                      }
                      alt="Rotten Tomatoes"
                    />
                  )}

                  <span className="tomatometer__rating">
                    {video.rottenTomatoesScore}
                    {typeof video.rottenTomatoesScore === 'number' ? '%' : ''}
                  </span>
                </div>
                <div className="video-additional-details">
                  {video.Released.toLowerCase() !== 'n/a' && (
                    <span className="video-additional-details__release-date">
                      {video.Released}
                    </span>
                  )}
                  {video.Runtime.toLowerCase() !== 'n/a' && (
                    <span className="video-additional-details__runtime">
                      {video.Runtime}
                    </span>
                  )}
                  {video.Rated.toLowerCase() !== 'n/a' && (
                    <span className="video-additional-details__age-rating">
                      {video.Rated}
                    </span>
                  )}
                </div>
                <button
                  className="video-profile__watch-list-btn"
                  onClick={() => addVideoToWatchList(video)}
                >
                  Add To Watch List
                </button>
              </div>
            </section>
          </div>
          <div className="video-profile-sections">
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
        </div>
      )}
    </div>
  );
};

export default VideoProfile;
