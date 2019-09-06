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

    default: {
      return state;
    }
  }
};
