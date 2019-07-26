import React from 'react';
import Navbar from './Navbar.js';
import searchIcon from '../img/search-icon.svg';
import Media from './Media.js';
import popcorn from '../img/popcorn.svg';
import '../css/home.scss';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <form className="search">
        <input className="search__input" type="text" placeholder="Search" />
        <button className="search__btn" type="submit">
          <img
            className="search__btn-img"
            src={searchIcon}
            alt="Search Button"
          />
        </button>
      </form>
      <div className="search-result">
        <div className="search-default">
          {/* <img className="search-default__img" src={popcorn} alt="Container of Popcorn"/>
          <p className="search-default__message">Search For Movies or Shows</p> */}
         <Media/>
        </div>
      </div>
    </div>
  );
};

export default Home;
