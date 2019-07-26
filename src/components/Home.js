import React from 'react';
import Navbar from './Navbar.js';
import searchIcon from '../img/search-icon.svg';
import '../css/home.scss';


const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <form className="search">
      <input className="search__input" type="text" placeholder="Search"/>
      <button type="submit" className="search__btn">
        <img className="search__btn-img" src={searchIcon} alt=""/>
      </button>
      </form>
    </div>
  );
};

export default Home;
