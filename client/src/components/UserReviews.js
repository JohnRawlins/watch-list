import React from 'react';
import '../css/user-reviews.scss';
import Review from './Review';

const UserReviews = ({ videoReviews: { userReviews: reviews } }) => {
  if (reviews) {
    reviews = reviews.map((reviewInfo, index) => {
      return <Review reviewInfo={reviewInfo} key={index} />;
    });
  }

  return <div className="user-reviews">{reviews}</div>;
};

export default UserReviews;
