import React, { useContext, useReducer } from 'react';
import MyVideoListContext from './myVideoListContext';
import myVideoListReducer from './myVideoListReducer';

const MyVideoListState = props => {
  const initialState = {
    usersWatchList: [],
    error: '',
    removeVideoItem: false
  };

  const [state, dispatch] = useReducer(myVideoListReducer, initialState);

  const editVideoList = option => {
    if (option) {
      dispatch({
        type: 'ENABLE_VIDEO_REMOVAL'
      });
    } else {
      dispatch({
        type: 'DISABLE_VIDEO_REMOVAL'
      });
    }
  };

  const loadUsersWatchList = async userToken => {
    const guestUsersWatchList = JSON.parse(
      localStorage.getItem('guestWatchList')
    );
    try {
      if (userToken) {
        const usersWatchListResponse = await fetch('api/videos', {
          headers: { 'x-auth-token': userToken.token }
        });

        if (usersWatchListResponse.ok) {
          const usersWatchListPayload = await usersWatchListResponse.json();

          dispatch({
            type: 'LOAD_WATCH_LIST',
            payload: usersWatchListPayload.videos
          });
        } else {
          dispatch({
            type: 'LOAD-WATCH_LIST_FAIL'
          });
        }
      } else if (guestUsersWatchList) {
        dispatch({
          type: 'LOAD_WATCH_LIST',
          payload: guestUsersWatchList
        });
      } else {
        dispatch({
          type: 'LOAD-WATCH_LIST_FAIL'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyVideoListContext.Provider
      value={{
        usersWatchList: state.usersWatchList,
        error: state.error,
        removeVideoItem: state.removeVideoItem,
        editVideoList,
        loadUsersWatchList
      }}
    >
      {props.children}
    </MyVideoListContext.Provider>
  );
};

export default MyVideoListState;
