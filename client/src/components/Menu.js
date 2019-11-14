import React, { useContext, useEffect } from 'react';
import AuthContext from '../components/context/auth/authContext';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import MyReviewContext from './context/review/reviewContext';
import '../css/menu.scss';
import { Link, withRouter } from 'react-router-dom';
import userIcon from '../img/user-icon.svg';
import exitIcon from '../img/exit-icon.svg';

const Menu = ({ history }) => {
  let { menuVisible, menuOpen, user, logUserOut } = useContext(AuthContext);
  const { clearUsersVideoInfo } = useContext(MyVideoListContext);
  const { clearUsersReviewInfo } = useContext(MyReviewContext);
  const menuPosition = menuOpen ? { visibility: 'visible', transform:"translateX(0px)" } : {};
  const username = user ? user.username : 'Guest';

  const handleMenuSelection = () => {
    menuVisible(false);
  };

  const handleLogOut = () => {
    logUserOut();
    clearUsersVideoInfo();
    clearUsersReviewInfo();
  };

  useEffect(() => {
    if (menuOpen) {
      menuVisible(false);
    }
  }, [history]);

  return (
    <div className="menu" style={menuPosition}>
      <div className="menu-header">
        <div className="user">
          <img className="user__icon" src={userIcon} alt="Profile Icon" />
          <p className="user__name">{username}</p>
        </div>
        <button className="menu-header__exit-btn" onClick={handleMenuSelection}>
          <img className="menu-header__exit-icon" src={exitIcon} alt="Exit" />
        </button>
      </div>
      <ul className="menu-option" onClick={handleMenuSelection}>
        <Link to="/my-watch-list">
          <li className="menu-option__item">My Watch List</li>
        </Link>
        {user && (
          <Link to="/my-reviews">
            <li className="menu-option__item">My Reviews</li>
          </Link>
        )}
        <Link to="/search">
          <li className="menu-option__item">Search</li>
        </Link>
        {!user && (
          <Link to="/login">
            <li className="menu-option__item">Sign In</li>
          </Link>
        )}
        {user && (
          <Link onClick={handleLogOut} to="/login">
            <li className="menu-option__item">Sign Out</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
