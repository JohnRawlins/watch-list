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
          visible: false,
          score: '',
          scoreDesc: '',
          edit: false,
          review: null
        }
      };
    }

    case 'SHOW_EDIT_REVIEW_MODAL': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: true,
          edit: true,
          review: action.payload
        }
      };
    }

    case 'HIDE_EDIT_REVIEW_MODAL': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: false,
          score: '',
          scoreDesc: '',
          edit: false,
          review: null
        }
      };
    }

    case 'CLEAR_WRITE_REVIEW_RESPONSE': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: false,
          score: '',
          scoreDesc: '',
          edit: false,
          review: null
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

    case 'LOADING_REVIEWS': {
      return {
        ...state,
        reviewsLoading: true
      };
    }

    case 'DONE_LOADING_REVIEWS': {
      return {
        ...state,
        reviewsLoading: false
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
          edit: false,
          review: null
        }
      };
    }

    case 'EDIT_REVIEW': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: false,
          edit: false,
          review: null
        }
      };
    }

    case 'DELETE_REVIEW': {
      return {
        ...state,
        deleteReviewModal: {
          ...state.deleteReviewModal,
          visible: false,
          review: null
        }
      };
    }

    case 'SHOW_DELETE_REVIEW_MODAL': {
      return {
        ...state,
        deleteReviewModal: {
          ...state.deleteReviewModal,
          visible: true,
          review: action.payload
        }
      };
    }

    case 'CLEAR_DELETE_REVIEW_MODAL': {
      return {
        ...state,
        deleteReviewModal: {
          ...state.deleteReviewModal,
          visible: false,
          review: null
        }
      };
    }

    case 'CLEAR_REVIEW_INFO': {
      return {
        ...state,
        writeReviewModal: {
          ...state.writeReviewModal,
          visible: false,
          score: '',
          scoreDesc: '',
          edit: false,
          review: null
        },
        deleteReviewModal: {
          ...state.deleteReviewModal,
          visible: false,
          review: null
        },
        userReviews: []
      };
    }

    default:
      return state;
  }
};
