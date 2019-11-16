import React, { useContext, useState, useEffect } from 'react';
import ReviewContext from './context/review/reviewContext';
import AuthContext from './context/auth/authContext';
import ReviewStars from './ReviewStars';
import {Spring} from 'react-spring/renderprops';
import '../css/write-review.scss';


const WriteReview = ({ videoInfo: { body: reviewText }, videoInfo }) => {
  const {
    setWriteReviewModal,
    writeReviewModal,
    submitVideoReview,
    submitReviewEdit,
    setEditReviewModal
  } = useContext(ReviewContext);

  const { user, userToken, loadUser } = useContext(AuthContext);

  const [reviewBody, setReviewBody] = useState(reviewText);

  const [submitDisableStatus, setSubmitDisableStatus] = useState(true);

  const handleReviewBody = event => {
    setReviewBody(event.target.value);
  };

  const handleWriteReviewSubmit = () => {
    if (writeReviewModal.edit) {
      submitReviewEdit({
        body: reviewBody,
        stars: writeReviewModal.score,
        _id: videoInfo._id
      });
    } else {
      submitVideoReview({
        imdbID: videoInfo.imdbID,
        videoTitle: videoInfo.Title,
        body: reviewBody,
        stars: writeReviewModal.score
      });
    }
  };

  useEffect(() => {
    loadUser(userToken);
  }, []);

  useEffect(() => {
    if (reviewBody) {
      !writeReviewModal.score || !reviewBody.trim()
        ? setSubmitDisableStatus(true)
        : setSubmitDisableStatus(false);
    } else {
      setSubmitDisableStatus(true);
    }
  }, [writeReviewModal.score, reviewBody]);

  return (
    user && (
      <div className="write-review-modal">
        <Spring
          from={{ transform: 'scale(0)', opacity: 0 }}
          to={{ transform: 'scale(1)', opacity: 1 }}
        >
          {animation => (
            <div style={animation} className="write-review-container">
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
                  <span className="score__desc">
                    {writeReviewModal.scoreDesc}
                  </span>
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
                    onClick={handleWriteReviewSubmit}
                    className="review-btns__submit"
                    disabled={submitDisableStatus}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </Spring>
      </div>
    )
  );
};

export default WriteReview;
