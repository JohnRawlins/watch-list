import React, { useContext } from 'react';
import AuthContext from '../components/context/auth/authContext';
import '../css/menu.scss';
import { Link } from 'react-router-dom';
import userIcon from '../img/user-icon.svg';
import exitIcon from '../img/exit-icon.svg';

const Menu = () => {
  let { menuVisible, menuOpen, user } = useContext(AuthContext);
  const menuPosition = menuOpen ? { transform: 'translatex(0%) scale(1)' } : {};
  user = user ? user.username : 'Guest';

  const handleMenuSelection = () => {
    menuVisible(false);
  };

  return (
    <div className="menu" style={menuPosition}>
      <div className="menu-header">
        <div className="user">
          <img className="user__icon" src={userIcon} alt="Profile Icon" />
          <p className="user__name">{user}</p>
        </div>
        <button
          className="menu-header__exit-btn"
          onClick={() => menuVisible(false)}
        >
          <img className="menu-header__exit-icon" src={exitIcon} alt="Exit" />
        </button>
      </div>
      <ul className="menu-option" onClick={handleMenuSelection}>
        <li className="menu-option__item">
          <Link to="/my-watch-list">My Watch List</Link>
        </li>
        <li className="menu-option__item">
          <Link>My Reviews</Link>
        </li>
        <li className="menu-option__item">
          <Link to="/search">Search</Link>
        </li>
        <li className="menu-option__item">
          <Link to="/login">Sign In</Link>
        </li>
        <li className="menu-option__item">
          <Link>Sign Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
