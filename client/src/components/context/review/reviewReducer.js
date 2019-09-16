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
          response: '',
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
          response: '',
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
          response: '',
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
          response: action.payload.msg,
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
          response: action.payload.msg,
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
          review: null,
          response: action.payload.msg
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
          review: null,
          response: ""
        }
      };
    }

    default:
      return state;
  }
};