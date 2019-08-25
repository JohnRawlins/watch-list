export default (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        isAuthenticated:true,
        token: action.payload
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
  }
};
