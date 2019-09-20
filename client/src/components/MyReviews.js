import React, { useState, useEffect, useContext } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import WriteReview from './WriteReview';
import AuthContext from './context/auth/authContext';
import ReviewContext from './context/review/reviewContext';
import Navbar from './Navbar';
import MyReviewList from './MyReviewList';
import searchIcon from '../img/search-icon.svg';
import RemoveReviewModal from './RemoveReviewModal';
import '../css/my-reviews.scss';

const MyReviews = () => {
  const [myReviews, setMyReviews] = useState({});
  const { userToken, setTokenStatus } = useContext(AuthContext);
  const {
    writeReviewModal: { review },
    deleteReviewModal
  } = useContext(ReviewContext);

  const { infoModalMsg } = useContext(MyVideoListContext);

  const getMyReviews = async () => {
    const myReviewsResponse = await fetch('/api/reviews', {
      headers: { 'x-auth-token': userToken }
    });

    const myReviewsPayload = await myReviewsResponse.json();

    if (myReviewsResponse.ok) {
      setMyReviews(myReviewsPayload);
    } else if (myReviewsPayload.hasOwnProperty('expiredToken')) {
      setTokenStatus(myReviewsPayload.expiredToken, myReviewsPayload.msg, true);
    }
  };

  useEffect(() => {
    if (userToken) getMyReviews();
  }, [infoModalMsg]);

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
        {deleteReviewModal.review && <RemoveReviewModal />}
        {review && <WriteReview videoInfo={review} />}
      </div>
    </div>
  );
};

export default MyReviews;
