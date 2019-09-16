import React, { useReducer, useContext } from 'react';
import reviewReducer from './reviewReducer';
import ReviewContext from './reviewContext';
import AuthContext from '../auth/authContext';

const ReviewState = props => {
  const initialState = {
    writeReviewModal: {
      visible: false,
      response: '',
      score: '',
      scoreDesc: '',
      edit: false,
      review: null
    },
    deleteReviewModal: {
      visible: false,
      response: '',
      review: null
    },
    userReviews: []
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);

  const { user, token: userToken } = useContext(AuthContext);

  const getVideoReviews = async videoImdbID => {
    try {
      const videoReviewsResponse = await fetch(`/api/reviews/${videoImdbID}`);

      const videoReviewsPayload = await videoReviewsResponse.json();

      dispatch({
        type: 'GET_VIDEO_REVIEWS',
        payload: videoReviewsPayload
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setWriteReviewModal = visible => {
    if (visible) {
      dispatch({
        type: 'SHOW_WRITE_REVIEW_MODAL'
      });
    } else {
      dispatch({
        type: 'HIDE_WRITE_REVIEW_MODAL'
      });
    }
  };

  const setEditReviewModal = (visible, review = null) => {
    if (visible) {
      dispatch({
        type: 'SHOW_EDIT_REVIEW_MODAL',
        payload: review
      });
    } else {
      dispatch({
        type: 'HIDE_EDIT_REVIEW_MODAL'
      });
    }
  };

  const submitReviewEdit = async review => {
    const editReviewResponse = await fetch(`/api/reviews/${review._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userToken.token
      },
      body: JSON.stringify({ stars: review.stars, text: review.body })
    });

    const editReviewPayload = await editReviewResponse.json();

    dispatch({
      type: 'EDIT_REVIEW',
      payload: editReviewPayload
    });
  };

  const submitVideoReview = async review => {
    const username = user.username;
    review = { ...review, username };
    try {
      const submitReviewResponse = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userToken.token
        },
        body: JSON.stringify(review)
      });

      const submitReviewPayload = await submitReviewResponse.json();

      dispatch({
        type: 'CREATE_REVIEW',
        payload: submitReviewPayload
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideoReview = async reviewID => {
    try {
      const deleteReviewResponse = await fetch(`/api/reviews/${reviewID}`, {
        method:"DELETE",
        headers: { 'x-auth-token': userToken.token }
      });

      const deleteReviewPayload = await deleteReviewResponse.json();

      dispatch({
        type: 'DELETE_REVIEW',
        payload: deleteReviewPayload
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setDeleteReviewModal = (visible, review = null) => {
    if (visible) {
      dispatch({
        type: 'SHOW_DELETE_REVIEW_MODAL',
        payload: review
      });
    } else {
      dispatch({
        type: 'CLEAR_DELETE_REVIEW_MODAL'
      });
    }
  };

  const clearWriteReviewResp = () => {
    dispatch({
      type: 'CLEAR_WRITE_REVIEW_RESPONSE'
    });
  };

  const setScoreAndDescription = score => {
    let scoreDesc = '';

    switch (score) {
      case 1:
        scoreDesc = 'hated';
        break;

      case 2:
        scoreDesc = "didn't like";
        break;

      case 3:
        scoreDesc = 'just ok';
        break;

      case 4:
        scoreDesc = 'liked';
        break;

      case 5:
        scoreDesc = 'loved';
        break;
    }

    dispatch({
      type: 'SET_SCORE_AND_DESC',
      payload: { score, scoreDesc }
    });
  };
  return (
    <ReviewContext.Provider
      value={{
        writeReviewModal: state.writeReviewModal,
        userReviews: state.userReviews,
        deleteReviewModal: state.deleteReviewModal,
        setWriteReviewModal,
        setEditReviewModal,
        setDeleteReviewModal,
        setScoreAndDescription,
        submitVideoReview,
        clearWriteReviewResp,
        getVideoReviews,
        submitReviewEdit,
        deleteVideoReview
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
