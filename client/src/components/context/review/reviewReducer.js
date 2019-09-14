export default (state, action) => {
  switch (action.type) {
    case 'SHOW_WRITE_REVIEW_MODAL': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: true
        }
      };
    }

    case 'HIDE_WRITE_REVIEW_MODAL': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: false
        }
      };
    }

    case 'CLEAR_WRITE_REVIEW_RESPONSE': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: false,
          response: ''
        }
      };
    }

    case 'SET_SCORE_AND_DESC': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          score: action.payload.score,
          scoreDesc: action.payload.scoreDesc
        }
      };
    }

    case 'GET_VIDEO_REVIEWS': {
      return {
        ...state,
        userReviews: action.payload
      };
    }

    case 'CREATE_REVIEW': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: false,
          response: action.payload.msg
        }
      };
    }

    default:
      return state;
  }
};
