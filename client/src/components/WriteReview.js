import React, { useContext, useState } from 'react';
import ReviewContext from './context/review/reviewContext';
import AuthContext from './context/auth/authContext';
// import MyVideoListContext from './context/my-video-list/myVideoListContext';
import '../css/write-review.scss';
import ReviewStars from './ReviewStars';

const WriteReview = ({ videoInfo }) => {
  const {
    setWriteReviewModal,
    writeReviewModal,
    submitVideoReview
  } = useContext(ReviewContext);
  const { user } = useContext(AuthContext);

  const [reviewBody, setReviewBody] = useState('');

  const handleReviewBody = event => {
    setReviewBody(event.target.value);
  };

  // const { } = useContext(
  //   MyVideoListContext
  // );

  return (
    <div className="write-review-modal">
      <div className="write-review-container">
        <div className="write-review">
          <h1 className="write-review__media-title">{videoInfo.Title}</h1>
          <p className="write-review__username">
            Review by: <span>{user.username}</span>
          </p>
          <div className="score">
            <h2 className="score__heading">Select Star To Rate</h2>
            <ReviewStars />
            <span className="score__desc">{writeReviewModal.scoreDesc}</span>
          </div>
          <textarea
            className="write-review__review-txt-area"
            placeholder="Tell others what you think about this movie"
            onChange={handleReviewBody}
            value={reviewBody}
          />
          <div className="review-btns">
            <button
              onClick={() => setWriteReviewModal(false)}
              className="review-btns__cancel"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                submitVideoReview({
                  imdbID: videoInfo.imdbID,
                  videoTitle: videoInfo.Title,
                  body: reviewBody,
                  stars: writeReviewModal.score
                })
              }
              className="review-btns__submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
