import React from 'react';
import MyReviewItem from './MyReviewItem';
import '../css/my-review-list.scss';

const MyReviewList = ({ myReviews: { reviews } }) => {
  let reviewList = [];
  let reviewListLength = 0;
  if (reviews) {
    reviewList = reviews.map(review => {
      return <MyReviewItem key={review._id} reviewDetails={review} />;
    });
    reviewListLength = reviewList.length;
  }

  return (
    <ul className="my-review-list">
      <p className="my-review-list__results">
        Results:
        <span className="my-review-list__total"> {reviewListLength}</span>
      </p>
      {reviewList}
    </ul>
  );
};

export default MyReviewList;
