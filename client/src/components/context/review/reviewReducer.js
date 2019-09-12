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

    case 'SET_SCORE_DESC': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          scoreDesc: action.payload
        }
      };
    }

    default:
      return state;
  }
};
