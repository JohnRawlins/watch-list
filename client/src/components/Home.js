import React, { useState, useEffect, useContext } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import PageSelector from './PageSelector';
import Navbar from './Navbar';
import searchIcon from '../img/search-icon.svg';
import popcorn from '../img/popcorn.svg';
import VideoList from './VideoList';
import '../css/home.scss';

const Home = ({ history, location }) => {
  const { editVideoList } = useContext(MyVideoListContext);
  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState({
    Search: [],
    noResultsFound: false
  });
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [homeClickEvent, setHomeClickEvent] = useState(null);

  const searchForVideo = async () => {
    try {
      const omdbResponse = await fetch(`/api/search${location.search}`);
      const omdbResponsePayload = await omdbResponse.json();
      if (omdbResponsePayload.hasOwnProperty('Search')) {
        setSearchResults(omdbResponsePayload);
        setNumberOfPages(Math.ceil(omdbResponsePayload.totalResults / 10));
      } else {
        setSearchResults({ Search: [], noResultsFound: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchDefaultMessage = searchResults.noResultsFound
    ? 'No results found. Try again'
    : 'Search For Movies or Shows';

  const searchDefault = (
    <div className="search-default">
      <img
        className="search-default__img"
        src={popcorn}
        alt="Container of Popcorn"
      />
      <p className="search-default__message">{searchDefaultMessage}</p>
    </div>
  );

  const handleVideoSearch = event => {
    event.preventDefault();
    if (searchField) {
      history.push(`/search?videoTitle=${searchField.trim()}`);
    }
  };

  const handleSearchInput = event => {
    setSearchField(event.target.value);
  };

  const handleHomeClickEvent = event => {
    if (
      event.target.parentNode &&
      event.target.parentNode.id !== 'pg-selector'
    ) {
      setHomeClickEvent(event.target.parentNode);
    }
  };

  useEffect(() => {
    editVideoList(false);
    if (location.search.length - 1 !== location.search.indexOf('=')) {
      searchForVideo();
    } else {
      setSearchResults({ Search: [] });
    }

    //eslint-disable-next-line
  }, [location, homeClickEvent]);

  return (
    <div className="home" onClick={handleHomeClickEvent}>
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
        {searchResults.Response ? (
          <>
            <VideoList
              videoItems={searchResults.Search}
              videoItemsTotal={searchResults.totalResults}
            />
            <PageSelector
              parentComponentClickEvent={homeClickEvent}
              numberOfPages={numberOfPages}
              location={location}
            />
          </>
        ) : (
          searchDefault
        )}
      </div>
    </div>
  );
};

export default Home;
