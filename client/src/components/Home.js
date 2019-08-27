import React, { useState } from 'react';
import Navbar from './Navbar';
import MyList from './MyList';
import searchIcon from '../img/search-icon.svg';
import VideoList from './VideoList';
import Video from './Video';
import popcorn from '../img/popcorn.svg';
import '../css/home.scss';




// let videoItems = [
//   <Video
//     info={{
//       title: 'The Punisher',
//       year: '2017–2019',
//       poster:
//         'https://m.media-amazon.com/images/M/MV5BMTExODIwOTUxNzFeQTJeQWpwZ15BbWU4MDE5MDA0MTcz._V1_SX300.jpg'
//     }}
//   />,
//   <Video
//     info={{
//       title: 'The Shining',
//       year: '1980',
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
//     }}
//   />,
//   <Video
//     info={{
//       title: 'Hellboy',
//       year: '2019',
//       poster:
//         'https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg'
//     }}
//   />
// ];

const Home = () => {
  const [searchField, setSearchField] = useState('');

  const handleVideoSearch = event => {
    event.preventDefault();
  };

  const handleSearchInput = event => {
    setSearchField(event.target.value);
  };
  return (
    <div className="home">
      <Navbar />
      <form className="search" onSubmit={handleVideoSearch}>
        <input
          className="search__input"
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
          value={searchField}
        />
        <button className="search__btn" type="submit">
          <img
            className="search__btn-img"
            src={searchIcon}
            alt="Search Button"
          />
        </button>
      </form>
      <div className="search-result">
        {/* <VideoList videoList={videoItems} /> */}
        <div className="search-default">
          <img
            className="search-default__img"
            src={popcorn}
            alt="Container of Popcorn"
          />
          <p className="search-default__message">Search For Movies or Shows</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
