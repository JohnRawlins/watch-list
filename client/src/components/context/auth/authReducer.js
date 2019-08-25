export default (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        token: action.payload
      };
    }

    case 'REGISTER_FAIL': {
      return {
        ...state,
        registerErrors: action.payload.errors
      };
    }
  }
};
