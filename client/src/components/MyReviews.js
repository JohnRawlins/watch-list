import React, { useState, useEffect, useContext } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import WriteReview from './WriteReview';
import AuthContext from './context/auth/authContext';
import ReviewContext from './context/review/reviewContext';
import Navbar from './Navbar';
import MyReviewList from './MyReviewList';
import searchIcon from '../img/search-icon.svg';
import RemoveReviewModal from './RemoveReviewModal';
import useSort from '../hooks/useSort';
import '../css/my-reviews.scss';
import defaultMyReviewsIcon from '../img/default-my-reviews.svg';

const MyReviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const { userToken, setTokenStatus } = useContext(AuthContext);
  const {
    writeReviewModal: { review },
    deleteReviewModal,
    reviewsLoading,
    setReviewsLoading
  } = useContext(ReviewContext);

  const { infoModalMsg } = useContext(MyVideoListContext);

  const { setList, sortedList } = useSort();

  const [sortBy, setSortBy] = useState([]);

  const defaultMyReviews = (
    <div className="default-my-reviews">
      <img
        className="default-my-reviews__icon"
        src={defaultMyReviewsIcon}
        alt=""
      />
      <span className="default-my-reviews__text">
        You haven't reviewed any movies or shows.
      </span>
    </div>
  );

  const getMyReviews = async () => {
    setReviewsLoading(true);
    const myReviewsResponse = await fetch('/api/reviews', {
      headers: { 'x-auth-token': userToken }
    });

    const myReviewsPayload = await myReviewsResponse.json();

    setReviewsLoading(false);
    if (myReviewsResponse.ok) {
      setMyReviews(myReviewsPayload);
    } else if (myReviewsPayload.hasOwnProperty('expiredToken')) {
      setTokenStatus(myReviewsPayload.expiredToken, myReviewsPayload.msg, true);
    }
  };

  const handleListSort = event => {
    const sortOrderAndProp = event.target.value.split('/');
    setSortBy(sortOrderAndProp);
  };

  useEffect(() => {
    if (userToken) getMyReviews();
  }, [infoModalMsg]);

  useEffect(() => {
    setList(myReviews, sortBy);
  }, [myReviews, sortBy]);

  return (
    <div className="my-reviews-container">
      <Navbar />
      <div className="my-reviews">
        <header className="my-reviews-header">
          <h1 className="my-reviews-header__title">My Reviews</h1>
          <select onChange={handleListSort} className="my-reviews-sort">
            <option className="my-reviews-sort__option">Sort By</option>

            <option className="my-reviews-sort__option" value="asc/stars">
              Rating Low to High
            </option>

            <option className="my-reviews-sort__option" value="desc/stars">
              Rating Hight to Low
            </option>
            <option className="my-reviews-sort__option" value="asc/videoTitle">
              Title A to Z
            </option>
            <option className="my-reviews-sort__option" value="desc/videoTitle">
              Title Z to A
            </option>

            <option className="my-reviews-sort__option" value="asc/date">
              Oldest
            </option>

            <option className="my-reviews-sort__option" value="desc/date">
              Most Recent
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
        {sortedList.length < 1 && !reviewsLoading ? (
          defaultMyReviews
        ) : (
          <>
            <MyReviewList myReviews={sortedList} isLoading={reviewsLoading} />
            {deleteReviewModal.review && <RemoveReviewModal />}
            {review && <WriteReview videoInfo={review} />}
          </>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
