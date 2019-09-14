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
      videoID: '',
      videoImdbID: ''
    },
    videoInfoModalMsg: ''
  };

  const { token } = useContext(AuthContext);

  const userToken = token ? token : null;

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
      if (userToken) {
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
      } else {
        let guestWatchList = JSON.parse(localStorage.getItem('guestWatchList'));
        if (!guestWatchList) {
          guestWatchList = [];
        }
        const { imdbID, Title, Year, Poster, Type } = video;
        const videoToAdd = { imdbID, Title, Year, Poster, Type };

        if (guestWatchList.find(video => video.imdbID === videoToAdd.imdbID)) {
          dispatch({
            type: 'ADD_VIDEO',
            payload: {
              msg: `${Title} is already on your watch list`
            }
          });
        } else {
          guestWatchList.push(videoToAdd);
          localStorage.setItem(
            'guestWatchList',
            JSON.stringify(guestWatchList)
          );
          dispatch({
            type: 'ADD_VIDEO',
            payload: { msg: `${video.Title} has been added to your watch list` }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setRemoveVideoModal = (
    visible,
    videoTitle = '',
    videoID = '',
    videoImdbID = ''
  ) => {
    if (visible) {
      dispatch({
        type: 'SHOW_REMOVE_VIDEO_MODALS',
        payload: { videoTitle, videoID, videoImdbID }
      });
    } else {
      dispatch({
        type: 'HIDE_REMOVE_VIDEO_MODALS'
      });
    }
  };

  const removeVideoFromWatchList = async (videoID, videoToRemoveImdbID) => {
    try {
      if (userToken) {
        const removeVideoResponse = await fetch(`/api/videos/${videoID}`, {
          method: 'DELETE',
          headers: { 'x-auth-token': userToken }
        });

        const removeVideoPayload = await removeVideoResponse.json();

        dispatch({
          type: 'REMOVE_VIDEO',
          payload: removeVideoPayload
        });
      } else {
        let guestWatchList = JSON.parse(localStorage.getItem('guestWatchList'));
        let videoToRemove;
        guestWatchList = guestWatchList.filter(video => {
          if (video.imdbID !== videoToRemoveImdbID) {
            return true;
          } else {
            videoToRemove = video;
            return false;
          }
        });
        localStorage.setItem('guestWatchList', JSON.stringify(guestWatchList));

        dispatch({
          type: 'REMOVE_VIDEO',
          payload: {
            msg: `${videoToRemove.Title} has been removed from your watch list`
          }
        });
      }
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
