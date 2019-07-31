import React from 'react';
import Navbar from './Navbar';
import '../css/media-profile.scss';
import rottenTomatoesIcon from '../img/rotten-tomatoes-icon.svg';
import reviewStar from '../img/review-star.svg';
import Review from './Review';
import UserReviews from './UserReviews';

const MediaProfile = () => {
  let media = {
    title: 'Altice: Battle Angel',
    release: '14 Feb 2019',
    runningTime: '122 Min',
    ageRating: 'PG-13',
    rottenTomatoesRating: '61%',
    mediaPoster:
      'https://m.media-amazon.com/images/M/MV5BNzVhMjcxYjYtOTVhOS00MzQ1LWFiNTAtZmY2ZmJjNjIxMjllXkEyXkFqcGdeQXVyNTc5OTMwOTQ@._V1_SX300.jpg',
    plot:
      'A deactivated female cyborg is revived, but cannot remember anything of her past life and goes on a quest to find out who she is.',
    actors: 'Rosa Salazar, Christoph Waltz, Jennifer Connelly, Mahershala Ali',
    director: 'Robert Rodriguez',
    reviewScore: 4,
    totalReviews: 10
  };

  let reviews = [

  ]

  return (
    <div className="media-profile">
      <Navbar />
      <section className="media-details">
        <img
          className="media-details__poster"
          src={media.mediaPoster}
          alt="Media Poster"
        />
        <div className="media-details-general">
          <h1 className="media-details-general__title">{media.title}</h1>
          <p className="media-details-general__release-date">{media.release}</p>
          <p className="media-details-general__runtime">{media.runningTime}</p>
          <p className="media-details-general__age-rating">{media.ageRating}</p>
          <div className="media-details-rt">
            <img
              className="media-details-rt__icon"
              src={rottenTomatoesIcon}
              alt="Rotten Tomatoes"
            />
            <span className="media-details-rt__rating">
              {media.rottenTomatoesRating}
            </span>
          </div>
        </div>
      </section>
      <button className="media-profile__watch-list-btn">
        Add To Watch List
      </button>
      <section className="media-plot">
        <h2 className="media-plot__heading">Plot</h2>
        <p className="media-plot__text">{media.plot}</p>
      </section>
      <section className="media-credits">
        <h2 className="media-credits__heading">Cast and Credits</h2>
        <div className="media-actors">
          <h3 className="media-actors__heading">Actors</h3>
          <p className="media-actors__info">{media.actors}</p>
        </div>
        <div className="media-director">
          <h3 className="media-director__heading">Director</h3>
          <p className="media-director__info">{media.director}</p>
        </div>
      </section>
      <section className="user-reviews">
        <h2 className="user-reviews__heading">User Reviews</h2>
        <div className="media-review">
          <span className="media-review__score">{media.reviewScore}</span>
          <img
            className="media-review__star"
            src={reviewStar}
            alt="Review Star"
          />
          <button className="media-review__btn">Write A Review</button>
        </div>
        <div className="user-reviews-total">
          <p className="user-reviews-total__heading">Total</p>
          <span className="user-reviews-total__num">{media.totalReviews}</span>
        </div>
      </section>
      <UserReviews/>
    </div>
  );
};

export default MediaProfile;
