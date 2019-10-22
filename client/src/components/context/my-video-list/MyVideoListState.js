import React, { useContext, useReducer } from 'react';
import AuthContext from '../auth/authContext';
import myVideoListReducer from './myVideoListReducer';
import MyVideoListContext from './myVideoListContext';

const MyVideoListState = props => {
  const initialState = {
    usersWatchList: [],
    error: '',
    removeVideoItem: false,
    removeVideoModal: {
      visible: false,
      videoTitle: '',
      videoID: '',
      videoImdbID: ''
    },
    infoModalMsg: '',
    watchListLoading: false
  };

  const { userToken, isAuthenticated, setTokenStatus } = useContext(
    AuthContext
  );

  const [state, dispatch] = useReducer(myVideoListReducer, initialState);

  const setWatchListLoading = status => {
    if (status === true) {
      dispatch({
        type: 'LOADING_WATCHLIST'
      });
    }
  };

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

  const clearInfoModalMsg = () => {
    dispatch({
      type: 'CLEAR_INFO_MODAL_MSG'
    });
  };

  const addVideoToWatchList = async video => {
    try {
      if (isAuthenticated) {
        const addVideoResponse = await fetch('/api/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userToken
          },
          body: JSON.stringify(video)
        });

        const addVideoPayload = await addVideoResponse.json();

        if (addVideoPayload.hasOwnProperty('expiredToken')) {
          setTokenStatus(
            addVideoPayload.expiredToken,
            addVideoPayload.msg,
            true
          );
        } else {
          dispatch({
            type: 'ADD_VIDEO',
            payload: addVideoPayload
          });
        }
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
      console.error(error);
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
      if (isAuthenticated) {
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
      console.error(error);
    }
  };

  const loadUsersWatchList = async () => {
    setWatchListLoading(true);

    const guestUsersWatchList = JSON.parse(
      localStorage.getItem('guestWatchList')
    );
    try {
      if (isAuthenticated) {
        const usersWatchListResponse = await fetch('api/videos', {
          headers: { 'x-auth-token': userToken }
        });

        const usersWatchListPayload = await usersWatchListResponse.json();

        if (usersWatchListPayload.hasOwnProperty('expiredToken')) {
          setTokenStatus(
            usersWatchListPayload.expiredToken,
            usersWatchListPayload.msg,
            true
          );
        } else if (usersWatchListResponse.ok) {
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
      console.error(error);
    }
  };

  const clearUsersVideoInfo = () => {
    dispatch({
      type: 'CLEAR_VIDEO_INFO'
    });
  };

  const setInfoModalMsg = msg => {
    dispatch({
      type: 'SET_INFO_MODAL_MSG',
      payload: msg
    });
  };

  return (
    <MyVideoListContext.Provider
      value={{
        usersWatchList: state.usersWatchList,
        error: state.error,
        removeVideoItem: state.removeVideoItem,
        videoInfoModalMsg: state.videoInfoModalMsg,
        removeVideoModal: state.removeVideoModal,
        infoModalMsg: state.infoModalMsg,
        watchListLoading: state.watchListLoading,
        editVideoList,
        clearInfoModalMsg,
        loadUsersWatchList,
        addVideoToWatchList,
        removeVideoFromWatchList,
        setRemoveVideoModal,
        clearUsersVideoInfo,
        setInfoModalMsg
      }}
    >
      {props.children}
    </MyVideoListContext.Provider>
  );
};

export default MyVideoListState;
