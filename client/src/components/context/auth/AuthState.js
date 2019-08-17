import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = props => {
  const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
  const REGISTER_FAIL = 'REGISTER_FAIL';
  const USER_LOADED = 'USER_LOADED';
  const AUTH_ERROR = 'AUTH_ERROR';
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  const LOGIN_FAIL = 'LOGIN_FAIL';
  const LOGOUT = 'LOGOUT';
  const CLEAR_ERRORS = 'CLEAR_ERRORS';
  const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
