import React, { useContext, useReducer } from 'react';
import MyVideoListContext from './myVideoListContext';
import AuthContext from '../auth/authContext';
import myVideoListReducer from './myVideoListReducer';

const MyVideoListState = props => {
  const initialState = {
    usersWatchList: [],
    error: '',
    removeVideoItem: false,
    removeVideoModal: {
      visible: false,
      response: '',
      videoTitle: '',
      videoID: ''
    },
    videoInfoModalMsg: ''
  };

  const { token } = useContext(AuthContext);

  const userToken = token ? token.token : null;

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

  const clearVideoInfoModalMsg = () => {
    dispatch({
      type: 'CLEAR_VIDEO_INFO_MODAL_MSG'
    });
  };

  const addVideoToWatchList = async video => {
    try {
      const addVideoResponse = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userToken
        },
        body: JSON.stringify(video)
      });

      const addVideoPayload = await addVideoResponse.json();

      dispatch({
        type: 'ADD_VIDEO',
        payload: addVideoPayload
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setRemoveVideoModal = (visible, videoTitle = '', videoID = '') => {
    if (visible) {
      dispatch({
        type: 'SHOW_REMOVE_VIDEO_MODALS',
        payload: { videoTitle, videoID }
      });
    } else {
      dispatch({
        type: 'HIDE_REMOVE_VIDEO_MODALS'
      });
    }
  };

  const removeVideoFromWatchList = async videoID => {
    try {
      const removeVideoResponse = await fetch(`/api/videos/${videoID}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': userToken }
      });

      const removeVideoPayload = await removeVideoResponse.json();

      dispatch({
        type: 'REMOVE_VIDEO',
        payload: removeVideoPayload
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadUsersWatchList = async () => {
    const guestUsersWatchList = JSON.parse(
      localStorage.getItem('guestWatchList')
    );
    try {
      if (userToken) {
        const usersWatchListResponse = await fetch('api/videos', {
          headers: { 'x-auth-token': userToken }
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
        videoInfoModalMsg: state.videoInfoModalMsg,
        removeVideoModal: state.removeVideoModal,
        editVideoList,
        clearVideoInfoModalMsg,
        loadUsersWatchList,
        addVideoToWatchList,
        removeVideoFromWatchList,
        setRemoveVideoModal
      }}
    >
      {props.children}
    </MyVideoListContext.Provider>
  );
};

export default MyVideoListState;
