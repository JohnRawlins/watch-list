import React, { useEffect, useContext, useState } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext.js';
import AuthContext from './context/auth/authContext';
import Navbar from './Navbar';
import VideoList from './VideoList';
import RemoveVideoModal from './RemoveVideoModal';
import useSort from '../hooks/useSort';
import '../css/info-modal.scss';
import '../css/my-watch-list.scss';

const MyWatchList = () => {
  const {
    loadUsersWatchList,
    usersWatchList,
    editVideoList,
    removeVideoModal,
    infoModalMsg
  } = useContext(MyVideoListContext);

  const { isAuthenticated } = useContext(AuthContext);

  const { sortedList, setList } = useSort(usersWatchList);

  const [sortBy, setSortBy] = useState([]);

  const handleListSort = event => {
    const sortOrderAndProp = event.target.value.split('/');
    setSortBy(sortOrderAndProp);
  };

  useEffect(() => {
    editVideoList(true);
    loadUsersWatchList();
    //eslint-disable-next-line
  }, [infoModalMsg, isAuthenticated]);

  useEffect(() => {
    setList(usersWatchList, sortBy);
  }, [usersWatchList, sortBy]);

  return (
    <div className="my-watch-list-container">
      <Navbar />
      <div className="my-watch-list">
        <header className="my-watch-list-header">
          <h1 className="my-watch-list-header__title">My Watch List</h1>
          <select onChange={handleListSort} className="my-watch-list-sort">
            <option className="my-watch-list-sort__option">Sort By</option>

            <option className="my-watch-list-sort__option" value="asc/Title">
              Title A to Z
            </option>
            <option className="my-watch-list-sort__option" value="desc/Title">
              Title Z to A
            </option>
          </select>
        </header>

        <div className="watch-list-videos">
          <VideoList
            videoItems={sortedList}
            videoItemsTotal={sortedList.length}
          />
          {removeVideoModal.visible && <RemoveVideoModal />}
        </div>
      </div>
    </div>
  );
};

export default MyWatchList;
