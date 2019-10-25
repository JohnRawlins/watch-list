export default (state, action) => {
  switch (action.type) {
    case 'LOAD_WATCH_LIST': {
      return {
        ...state,
        usersWatchList: action.payload,
        watchListLoading: false
      };
    }

    case 'LOADING_WATCHLIST': {
      return {
        ...state,
        watchListLoading: true
      };
    }
    case 'LOAD_WATCH_LIST_FAIL': {
      return {
        ...state,
        watchListLoading: false
      };
    }

    case 'ENABLE_VIDEO_REMOVAL': {
      return {
        ...state,
        removeVideoItem: true
      };
    }

    case 'DISABLE_VIDEO_REMOVAL': {
      return {
        ...state,
        removeVideoItem: false
      };
    }

    case 'REMOVE_VIDEO': {
      return {
        ...state,
        removeVideoModal: {
          ...state.removeVideoModal,
          visible: false
        },
        infoModalMsg: action.payload.msg
      };
    }

    case 'ADD_VIDEO': {
      return {
        ...state,
        infoModalMsg: action.payload.msg
      };
    }

    case 'SHOW_REMOVE_VIDEO_MODALS': {
      return {
        ...state,
        removeVideoModal: {
          ...state.removeVideoModal,
          visible: true,
          videoTitle: action.payload.videoTitle,
          videoID: action.payload.videoID,
          videoImdbID: action.payload.videoImdbID
        }
      };
    }

    case 'HIDE_REMOVE_VIDEO_MODALS': {
      return {
        ...state,
        removeVideoModal: {
          visible: false,
          videoTitle: '',
          videoID: '',
          videoImdbID: ''
        }
      };
    }

    case 'SET_INFO_MODAL_MSG': {
      return {
        ...state,
        infoModalMsg: action.payload
      };
    }

    case 'CLEAR_INFO_MODAL_MSG': {
      return {
        ...state,
        infoModalMsg: ''
      };
    }

    case 'CLEAR_VIDEO_INFO': {
      return {
        ...state,
        usersWatchList: [],
        error: '',
        removeVideoItem: false,
        removeVideoModal: {
          ...state.removeVideoModal,
          visible: false,
          videoTitle: '',
          videoID: '',
          videoImdbID: ''
        },
        infoModalMsg: ''
      };
    }

    default: {
      return state;
    }
  }
};
