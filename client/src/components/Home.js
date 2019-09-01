import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MyList from './MyList';
import searchIcon from '../img/search-icon.svg';
import popcorn from '../img/popcorn.svg';
import VideoList from './VideoList';
import Video from './Video';
import '../css/home.scss';

const Home = ({ history, location }) => {
  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState({});

  const searchForVideo = async () => {
    try {
      const omdbResponse = await fetch(`/api/search${location.search}`);
      const omdbResponsePayload = await omdbResponse.json();
      setSearchResults(omdbResponsePayload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.search.length - 1 !== location.search.indexOf('=')) {
      searchForVideo();
    } else {
      setSearchResults({ ...searchResults, Search: [] });
    }

    //eslint-disable-next-line
  }, [location]);

  const handleVideoSearch = event => {
    event.preventDefault();
    history.push(`/search?videoTitle=${searchField}`);
  };

  const handleSearchInput = event => {
    setSearchField(event.target.value);
  };

  const searchDefault = (
    <div className="search-default">
      <img
        className="search-default__img"
        src={popcorn}
        alt="Container of Popcorn"
      />
      <p className="search-default__message">Search For Movies or Shows</p>
    </div>
  );

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
        {!searchResults.Search || searchResults.Search.length === 0 ? (
          searchDefault
        ) : (
          <VideoList videoSearchResults={searchResults.Search} videoSearchResultsTotal={searchResults.totalResults} />
        )}
      </div>
    </div>
  );
};

export default Home;
