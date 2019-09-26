import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './context/auth/authContext';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import MyReviewContext from './context/review/reviewContext';
import '../css/desktop-menu.scss';

const DesktopMenu = () => {
  const { menuVisible, user, logUserOut } = useContext(AuthContext);
  const { clearUsersVideoInfo } = useContext(MyVideoListContext);
  const { clearUsersReviewInfo } = useContext(MyReviewContext);

  const guestMenu = [
    { name: 'My WatchList', path: '/my-watch-list' },
    { name: 'Search', path: '/search' },
    { name: 'Sign In', path: '/login' }
  ];
  const userMenu = [
    { name: 'My WatchList', path: '/my-watch-list' },
    { name: 'My Reviews', path: '/my-reviews' },
    { name: 'Search', path: '/search' },
    { name: 'Sign Out', path: '/login' }
  ];

  const handleLogOut = () => {
    logUserOut();
    clearUsersVideoInfo();
    clearUsersReviewInfo();
  };

  let userOptions = null;
  let guestOptions = null;

  if (user) {
    userOptions = userMenu.map((option, index) => {
      return option.path === '/login' ? (
        <Link onClick={handleLogOut} to={option.path} key={index.toString()}>
          <li className="desktop-menu__option">{option.name}</li>
        </Link>
      ) : (
        <Link to={option.path} key={index.toString()}>
          <li>{option.name}</li>
        </Link>
      );
    });
  } else {
    guestOptions = guestMenu.map((option, index) => {
      return (
        <Link key={index.toString()} to={option.path} key={index.toString()}>
          <li className="desktop-menu__option">{option.name}</li>
        </Link>
      );
    });
  }
  return <ul className="desktop-menu">{user ? userOptions : guestOptions}</ul>;
};

export default DesktopMenu;
