import React, { useContext, useState } from 'react';
import ReviewContext from './context/review/reviewContext';
import AuthContext from './context/auth/authContext';
// import MyVideoListContext from './context/my-video-list/myVideoListContext';
import '../css/write-review.scss';
import ReviewStars from './ReviewStars';

const WriteReview = ({ videoInfo: { body: reviewText }, videoInfo }) => {
  const {
    setWriteReviewModal,
    writeReviewModal,
    submitVideoReview,
    submitReviewEdit,
    setEditReviewModal
  } = useContext(ReviewContext);
  const { user } = useContext(AuthContext);

  const [reviewBody, setReviewBody] = useState(reviewText);

  const handleReviewBody = event => {
    setReviewBody(event.target.value);
  };

  return (
    <div className="write-review-modal">
      <div className="write-review-container">
        <div className="write-review">
          <h1 className="write-review__media-title">
            {videoInfo.Title || videoInfo.videoTitle}
          </h1>
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
              onClick={() => {
                if (writeReviewModal.edit) setEditReviewModal(false);
                else setWriteReviewModal(false);
              }}
              className="review-btns__cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (writeReviewModal.edit) {
                  submitReviewEdit({
                    body: reviewBody,
                    stars: writeReviewModal.score,
                    _id: videoInfo._id
                  });
                } else
                  submitVideoReview({
                    imdbID: videoInfo.imdbID,
                    videoTitle: videoInfo.Title,
                    body: reviewBody,
                    stars: writeReviewModal.score
                  });
              }}
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
