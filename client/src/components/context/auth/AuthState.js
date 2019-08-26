import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = props => {
  const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    registerErrors: [],
    signInErrors: [],
    isAuthenticated: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

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

        loadUser(responsePayload.token);
      } else {
        dispatch({
          type: 'SIGN_IN_FAIL',
          payload: responsePayload
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async token => {
    try {
      let response = await fetch('/api/auth', {
        headers: {
          'x-auth-token': token
        }
      });

      let responsePayload = await response.json();

      if (response.ok) {
        dispatch({
          type: 'LOAD_USER_SUCCESS',
          payload: responsePayload
        });
      } else {
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
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials)
      });

      let responsePayload = await response.json();

      if (response.ok) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: responsePayload.token
        });
        loadUser(responsePayload.token);
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

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        registerErrors: state.registerErrors,
        signInErrors: state.signInErrors,
        isAuthenticated: state.isAuthenticated,
        registerUser,
        loadUser,
        signInUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
