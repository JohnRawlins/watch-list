import React, { useEffect, useContext, useState } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext.js';
import AuthContext from './context/auth/authContext';
import Navbar from './Navbar';
import VideoList from './VideoList';
import RemoveVideoModal from './RemoveVideoModal';
import useSort from '../hooks/useSort';
import defaultWatchListIcon from '../img/default-watch-list.svg';
import '../css/info-modal.scss';
import '../css/my-watch-list.scss';

const MyWatchList = () => {
  const {
    loadUsersWatchList,
    usersWatchList,
    editVideoList,
    removeVideoModal,
    infoModalMsg,
    watchListLoading
  } = useContext(MyVideoListContext);

  const { isAuthenticated } = useContext(AuthContext);

  const { sortedList, setList } = useSort(usersWatchList);

  const [sortBy, setSortBy] = useState([]);

  const handleListSort = event => {
    const sortOrderAndProp = event.target.value.split('/');
    setSortBy(sortOrderAndProp);
  };

  const defaultWatchList = (
    <div className="watch-list-default">
      <img
        className="watch-list-default__icon"
        src={defaultWatchListIcon}
        alt="Empty Watch List"
      />
      <span className="watch-list-default__text">
        Your Watch List is empty. Use the search feature to add videos to your
        Watch List.
      </span>
    </div>
  );

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
          <select className="my-watch-list-sort" onChange={handleListSort}>
            <option className="my-watch-list-sort__option">Sort By</option>
            <option className="my-watch-list-sort__option" value="asc/Title">
              Title A to Z
            </option>
            <option className="my-watch-list-sort__option" value="desc/Title">
              Title Z to A
            </option>
          </select>
        </header>
        {sortedList.length < 1 && !watchListLoading ? (
          defaultWatchList
        ) : (
          <div className="watch-list-videos">
            <VideoList
              videoItems={sortedList}
              videoItemsTotal={sortedList.length}
              isLaoding={watchListLoading}
            />

            {removeVideoModal.visible && <RemoveVideoModal />}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWatchList;
