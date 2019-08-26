export default (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        registerErrors: []
      };
    }

    case 'REGISTER_FAIL': {
      return {
        ...state,
        registerErrors: action.payload.errors
      };
    }

    case 'LOAD_USER_SUCCESS': {
      return {
        ...state,
        user: action.payload
      };
    }

    case 'SIGN_IN_SUCCESS': {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        signInErrors: []
      };
    }

    case 'SIGN_IN_FAIL': {
      return {
        ...state,
        signInErrors: action.payload.errors
      };
    }

    default: {
      return state;
    }
  }
};
