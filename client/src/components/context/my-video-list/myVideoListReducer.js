export default (state, action) => {
  switch (action.type) {
    case 'LOAD_WATCH_LIST': {
      return {
        ...state,
        error: '',
        usersWatchList: action.payload
      };
    }

    case 'LOAD_WATCH_LIST_FAIL': {
      return {
        ...state,
        error: 'Failed to load Watch List'
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
          visible: false,
          response: action.payload.msg
        }
      };
    }

    case 'SHOW_REMOVE_VIDEO_MODALS': {
      return {
        ...state,
        removeVideoModal: {
          ...state.removeVideoModal,
          visible: true,
          videoTitle: action.payload.videoTitle,
          videoID: action.payload.videoID
        }
      };
    }

    case 'HIDE_REMOVE_VIDEO_MODALS': {
      return {
        ...state,
        removeVideoModal: {
          visible: false,
          response: '',
          videoTitle: '',
          videoID: ''
        }
      };
    }

    default: {
      return state;
    }
  }
};
