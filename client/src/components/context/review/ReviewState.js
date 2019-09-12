import React, { useReducer } from 'react';
import reviewReducer from './reviewReducer';
import ReviewContext from './reviewContext';

const ReviewState = props => {
  const initialState = {
    writeReviewModal: {
      visible: false,
      response: '',
      scoreDesc: ''
    }
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);

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

  const setScoreDescription = score => {
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
      type: 'SET_SCORE_DESC',
      payload: scoreDesc
    });
  };
  return (
    <ReviewContext.Provider
      value={{
        writeReviewModal: state.writeReviewModal,
        scoreDesc: state.storeDesc,
        setWriteReviewModal,
        setScoreDescription
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
