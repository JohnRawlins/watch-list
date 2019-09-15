import React, { useState, useEffect, useContext } from 'react';
import WriteReview from './WriteReview';
import InfoModal from './InfoModal';
import AuthContext from './context/auth/authContext';
import ReviewContext from './context/review/reviewContext';
import Navbar from './Navbar';
import MyReviewList from './MyReviewList';
import searchIcon from '../img/search-icon.svg';
import star from '../img/review-star.svg';
import MyReviewItem from './MyReviewItem';
import RemoveReviewModal from './RemoveReviewModal';
import '../css/my-reviews.scss';

const MyReviews = () => {
  const [myReviews, setMyReviews] = useState({});
  const { token: userInfo } = useContext(AuthContext);
  const {
    writeReviewModal: { review, response }
  } = useContext(ReviewContext);

  const getMyReviews = async () => {
    const myReviewsResponse = await fetch('/api/reviews', {
      headers: { 'x-auth-token': userInfo.token }
    });
    if (myReviewsResponse.ok) {
      const myReviewsPayload = await myReviewsResponse.json();
      setMyReviews(myReviewsPayload);
    }
  };

  useEffect(() => {
    if (userInfo) getMyReviews();
  }, [response]);

  return (
    <div className="my-reviews-container">
      <Navbar />
      <div className="my-reviews">
        <header className="my-reviews-header">
          <h1 className="my-reviews-header__title">My Reviews</h1>
          <select className="my-reviews-sort">
            <option className="my-reviews-sort__ascending">Title A to Z</option>
            <option className="my-reviews-sort__descending">
              Title Z to A
            </option>
          </select>
        </header>
        <form className="search">
          <input className="search__input" type="text" placeholder="Search" />
          <button className="search__btn" type="submit">
            <img
              className="search__btn-img"
              src={searchIcon}
              alt="Search Button"
            />
          </button>
        </form>
        <MyReviewList myReviews={myReviews} />
        {review && <WriteReview videoInfo={review} />}
        {response && <InfoModal msg={response} />}
      </div>
    </div>
  );
};

export default MyReviews;
