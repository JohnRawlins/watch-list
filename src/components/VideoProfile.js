import React from 'react';
import Navbar from './Navbar';
import WriteReview from './WriteReview';
import '../css/video-profile.scss';
import rottenTomatoesIcon from '../img/rotten-tomatoes-icon.svg';
import reviewStar from '../img/review-star.svg';
import Review from './Review';
import UserReviews from './UserReviews';

const VideoProfile = () => {
  let video = {
    title: 'Alita: Battle Angel',
    release: '14 Feb 2019',
    runningTime: '122 Min',
    ageRating: 'PG-13',
    rottenTomatoesRating: '61%',
    videoPoster:
      'https://m.video-amazon.com/images/M/MV5BNzVhMjcxYjYtOTVhOS00MzQ1LWFiNTAtZmY2ZmJjNjIxMjllXkEyXkFqcGdeQXVyNTc5OTMwOTQ@._V1_SX300.jpg',
    plot:
      'A deactivated female cyborg is revived, but cannot remember anything of her past life and goes on a quest to find out who she is.',
    actors: 'Rosa Salazar, Christoph Waltz, Jennifer Connelly, Mahershala Ali',
    director: 'Robert Rodriguez',
    reviewScore: 4,
    totalReviews: 10
  };

  return (
    <div className="video-profile">
      <Navbar />
      {/* <WriteReview /> */}
      <section className="video-details">
        <img
          className="video-details__poster"
          src={video.videoPoster}
          alt="video Poster"
        />
        <div className="video-details-general">
          <h1 className="video-details-general__title">{video.title}</h1>
          <p className="video-details-general__release-date">{video.release}</p>
          <p className="video-details-general__runtime">{video.runningTime}</p>
          <p className="video-details-general__age-rating">{video.ageRating}</p>
          <div className="video-details-rt">
            <img
              className="video-details-rt__icon"
              src={rottenTomatoesIcon}
              alt="Rotten Tomatoes"
            />
            <span className="video-details-rt__rating">
              {video.rottenTomatoesRating}
            </span>
          </div>
        </div>
      </section>
      <button className="video-profile__watch-list-btn">
        Add To Watch List
      </button>
      <section className="video-plot">
        <h2 className="video-plot__heading">Plot</h2>
        <p className="video-plot__text">{video.plot}</p>
      </section>
      <section className="video-credits">
        <h2 className="video-credits__heading">Cast and Credits</h2>
        <div className="video-actors">
          <h3 className="video-actors__heading">Actors</h3>
          <p className="video-actors__info">{video.actors}</p>
        </div>
        <div className="video-director">
          <h3 className="video-director__heading">Director</h3>
          <p className="video-director__info">{video.director}</p>
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
  );
};

export default VideoProfile;
