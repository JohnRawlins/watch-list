export default (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        isAuthenticated: true,
        userToken: action.payload,
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
        isAuthenticated: true,
        user: action.payload
      };
    }

    case 'LOAD_USER_FAIL': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokenStatus: action.payload
      };
    }

    case 'SET_TOKEN_STATUS': {
      return {
        ...state,
        tokenStatus: action.payload
      };
    }

    case 'SIGN_IN_SUCCESS': {
      return {
        ...state,
        isAuthenticated: true,
        userToken: action.payload,
        signInErrors: []
      };
    }

    case 'SIGN_IN_FAIL': {
      return {
        ...state,
        signInErrors: action.payload.errors
      };
    }

    case 'MENU_OPENED': {
      return {
        ...state,
        menuOpen: true
      };
    }

    case 'MENU_CLOSED': {
      return {
        ...state,
        menuOpen: false
      };
    }

    case 'LOG_USER_OUT': {
      return {
        ...state,
        user: null,
        userToken: localStorage.removeItem('userToken'),
        registerErrors: [],
        signInErrors: [],
        isAuthenticated: false,
        menuOpen: false,
        tokenStatus: {
          ...state.tokenStatus,
          expired: false,
          msg: '',
          error: false
        }
      };
    }

    case 'CLEAR_FORM_ERRORS': {
      return {
        ...state,
        registerErrors: [],
        signInErrors: []
      };
    }

    default: {
      return state;
    }
  }
};
