import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = props => {
  const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    registerErrors:[]

  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async userCredentials => {
    try {
      let response = await fetch('/api/users', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials)
      });

      let responsePayload = await response.json();


      if (response.ok){

        dispatch({
          type: "REGISTER_SUCCESS",
          payload:responsePayload
        })
        
      }
      else{
        dispatch({
          type: "REGISTER_FAIL",
          payload:responsePayload

        })
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
        registerErrors:state.registerErrors,
        registerUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
