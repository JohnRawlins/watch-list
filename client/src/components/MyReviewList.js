import React from 'react';
import MyReviewItem from './MyReviewItem';
import ReviewPlaceHolder from './ReviewPlaceHolder';
import '../css/my-review-list.scss';

const MyReviewList = ({ myReviews, isLoading }) => {
  let reviewList = [];
  let reviewListLength = 0;

  if (myReviews) {
    reviewList = myReviews.map(review => {
      return <MyReviewItem key={review._id} reviewDetails={review} />;
    });
    reviewListLength = reviewList.length;
  }

  return (
    <ul className="my-review-list">
      {isLoading ? (
        <ReviewPlaceHolder />
      ) : (
        <>
          <p className="my-review-list__results">
            Results:
            <span className="my-review-list__total"> {reviewListLength}</span>
          </p>
          {reviewList}{' '}
        </>
      )}
    </ul>
  );
};

export default MyReviewList;
