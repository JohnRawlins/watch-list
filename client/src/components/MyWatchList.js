import React, { useEffect, useContext } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext.js';
import AuthContext from './context/auth/authContext';
import Navbar from './Navbar';
import VideoList from './VideoList';
import RemoveVideoModal from './RemoveVideoModal';
import InfoModal from './InfoModal';
import '../css/info-modal.scss';
import '../css/my-watch-list.scss';

const MyWatchList = ({ history }) => {
  const {
    loadUsersWatchList,
    usersWatchList,
    editVideoList,
    removeVideoModal,
    infoModalMsg
  } = useContext(MyVideoListContext);

  const { tokenStatus, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    editVideoList(true);
    loadUsersWatchList();
    //eslint-disable-next-line
  }, [infoModalMsg, isAuthenticated]);

  return (
    <div className="my-watch-list-container">
      <Navbar />
      <div className="my-watch-list">
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
        </div>
      </div>
    </div>
  );
};

export default MyWatchList;
