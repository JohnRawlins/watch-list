import React, { useEffect, useContext } from 'react';
import AuthContext from './context/auth/authContext.js';
import MyVideoListContext from './context/my-video-list/myVideoListContext.js';
import Navbar from './Navbar';
import VideoList from './VideoList';
import RemoveVideoModal from './RemoveVideoModal';
import InfoModal from './InfoModal';
import '../css/info-modal.scss';
import Video from './Video';
import '../css/my-watch-list.scss';
import defaultPoster from '../img/default-poster.svg';

const MyWatchList = () => {
  const {
    loadUsersWatchList,
    usersWatchList,
    editVideoList,
    removeVideoModal
  } = useContext(MyVideoListContext);

  useEffect(() => {
    editVideoList(true);
    loadUsersWatchList();
    //eslint-disable-next-line
  }, [removeVideoModal.response]);

  return (
    <div className="my-watch-list">
      <Navbar />
      <header className="my-watch-list-header">
        <h1 className="my-watch-list-header__title">My Watch List</h1>
        <select className="my-watch-list-sort">
          <option className="my-watch-list-sort__ascending">
            Title A to Z
          </option>
          <option className="my-watch-list-sort__descending">
            Title Z to A
          </option>
        </select>
      </header>
      <div className="watch-list-videos">
        <VideoList
          videoItems={usersWatchList}
          videoItemsTotal={usersWatchList.length}
        />
        {removeVideoModal.visible && <RemoveVideoModal />}
        {removeVideoModal.response && (
          <InfoModal msg={removeVideoModal.response} />
        )}
      </div>
    </div>
  );
};

export default MyWatchList;
