import React, { useContext } from 'react';
import AuthContext from '../components/context/auth/authContext';
import '../css/navbar.scss';
import watchListLogo from '../img/watchlist-logo.svg';
import menuIcon from '../img/hamburger-menu.svg';
import Menu from './Menu';

const Navbar = () => {
  const { menuVisible } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img
          className="navbar-logo__img"
          src={watchListLogo}
          alt="Smiling TV"
        />
        <span className="navbar-logo__title">Watch List</span>
      </div>
      <button className="navbar__menu-btn" onClick={() => menuVisible(true)}>
        <img
          className="navbar__menu-icon"
          src={menuIcon}
          alt="Hamburger Menu"
        />
      </button>
      <Menu />
    </div>
  );
};

export default Navbar;
