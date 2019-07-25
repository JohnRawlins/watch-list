import React from 'react';
import '../css/menu.scss';
import { Link } from 'react-router-dom';
import userIcon from '../img/user-icon.svg';
import exitIcon from '../img/exit-icon.svg';

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-header">
        <div className="user">
          <img className="user__icon" src={userIcon} alt="Profile Icon" />
          <p className="user__name">John</p>
        </div>
        <button className="menu-header__exit-btn">
          <img className="menu-header__exit-icon" src={exitIcon} alt="Exit" />
        </button>
      </div>
      <ul className="menu-option">
        <li className="menu-option__item">
          <Link>My Watch List</Link>
        </li>
        <li className="menu-option__item">
          <Link>My Reviews</Link>
        </li>
        <li className="menu-option__item">
          <Link>Search</Link>
        </li>
        <li className="menu-option__item">
          <Link>Sign Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
