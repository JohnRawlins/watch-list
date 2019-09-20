import React, { useReducer, useContext, useEffect } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = props => {
  const initialState = {
    user: null,
    userToken: localStorage.getItem('userToken'),
    registerErrors: [],
    signInErrors: [],
    isAuthenticated: false,
    tokenStatus: {
      expiredToken: false,
      msg: '',
      error:false
    },
    menuOpen: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const menuVisible = visible => {
    if (visible) {
      dispatch({
        type: 'MENU_OPENED'
      });
    } else {
      dispatch({
        type: 'MENU_CLOSED'
      });
    }
  };

  const signInUser = async userCredentials => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials)
      });

      const responsePayload = await response.json();

      if (response.ok) {
        dispatch({
          type: 'SIGN_IN_SUCCESS',
          payload: responsePayload
        });
        localStorage.setItem('userToken', responsePayload);
        loadUser(responsePayload);
      } else {
        dispatch({
          type: 'SIGN_IN_FAIL',
          payload: responsePayload
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadUser = async userToken => {
    try {
      let response = await fetch('/api/auth', {
        headers: {
          'x-auth-token': userToken
        }
      });

      let responsePayload = await response.json();

      if (response.ok) {
        dispatch({
          type: 'LOAD_USER_SUCCESS',
          payload: responsePayload
        });
      } else if (responsePayload.hasOwnProperty('expiredToken')) {
        dispatch({
          type: 'LOAD_USER_FAIL',
          payload: responsePayload
        });
      } else {
        const responsePayload = {
          expiredToken: false,
          msg: 'Something went wrong. Please try again.',
          error:true
        };
        dispatch({
          type: 'LOAD_USER_FAIL',
          payload: responsePayload
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async userCredentials => {
    try {
      let response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials)
      });

      let responsePayload = await response.json();

      if (response.ok) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: responsePayload
        });
        loadUser(responsePayload);
      } else {
        dispatch({
          type: 'REGISTER_FAIL',
          payload: responsePayload
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setTokenStatus = (status, msg, error) => {
    const tokenStatus = { expiredToken: status, msg, error };
    dispatch({
      type: 'SET_TOKEN_STATUS',
      payload: tokenStatus
    });
  };

  const logUserOut = () => {
    dispatch({
      type: 'LOG_USER_OUT'
    });
  };

  useEffect(() => {
    if (state.userToken) {
      loadUser(state.userToken);
    }
  }, [state.userToken]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userToken: state.userToken,
        registerErrors: state.registerErrors,
        signInErrors: state.signInErrors,
        isAuthenticated: state.isAuthenticated,
        menuOpen: state.menuOpen,
        tokenStatus: state.tokenStatus,
        registerUser,
        loadUser,
        signInUser,
        menuVisible,
        setTokenStatus,
        logUserOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
