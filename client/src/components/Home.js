import React, { useState, useEffect, useContext } from 'react';
import MyVideoListContext from './context/my-video-list/myVideoListContext';
import PageSelector from './PageSelector';
import Navbar from './Navbar';
import searchIcon from '../img/search-icon.svg';
import VideoList from './VideoList';
import PopularVideos from './PopularVideos';
import '../css/home.scss';

const Home = ({ history, location }) => {
  const { editVideoList, setPopularVideos, popularVideos } = useContext(
    MyVideoListContext
  );
  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState({
    Search: [],
    noResultsFound: false
  });
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [homeClickEvent, setHomeClickEvent] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const searchForVideo = async () => {
    try {
      setLoading(true);
      const omdbResponse = await fetch(`/api/search${location.search}`);
      const omdbResponsePayload = await omdbResponse.json();
      if (omdbResponsePayload.hasOwnProperty('Search')) {
        setSearchResults(omdbResponsePayload);
        setNumberOfPages(Math.ceil(omdbResponsePayload.totalResults / 10));
      } else {
        setSearchResults({ Search: [], noResultsFound: true });
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getPopularVideos = async () => {
    setLoading(true);
    try {
      const popularVideosResponse = await fetch('api/search/popular');
      if (popularVideosResponse.ok) {
        setLoading(false);
        const popularVideos = await popularVideosResponse.json();
        setPopularVideos(popularVideos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoSearch = event => {
    event.preventDefault();
    if (searchField.trim()) {
      history.push(`/search?videoTitle=${searchField.trim()}`);
    }
  };

  const handleSearchInput = event => {
    setSearchResults({...searchResults, noResultsFound:false})
    setSearchField(event.target.value);
  };

  const handleHomeClickEvent = event => {
    setHomeClickEvent({ node: event.target });
  };

  useEffect(() => {
    editVideoList(false);
    let videoTitle = new URL(window.location.href).searchParams.get(
      'videoTitle'
    );
    videoTitle = videoTitle ? videoTitle.trim() : videoTitle;
    if (videoTitle) {
      searchForVideo();
    } else {
      setSearchResults({ Search: [] });
    }

    //eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (!popularVideos) {
      getPopularVideos();
    }
  }, []);

  return (
    <div className="home" onClick={handleHomeClickEvent}>
      <Navbar />
      <div className="home-search-container">
        <div className="home-search">
          <form className="search" onSubmit={handleVideoSearch}>
            <input
              className="search__input"
              type="text"
              placeholder="Enter A Movie Or Show"
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
          <span className="home-search__no-results">{searchResults.noResultsFound && searchField ? `0 results found for "${searchField}"` : null}</span>
        </div>
      </div>
      <div className="search-result">
        {searchResults.Response ? (
          <>
            <VideoList
              videoItems={searchResults.Search}
              videoItemsTotal={searchResults.totalResults}
              isLoading={isLoading}
            />
            <PageSelector
              parentComponentClickEvent={homeClickEvent}
              numberOfPages={numberOfPages}
              location={location}
            />
          </>
        ) : (
          <PopularVideos popularVideos={popularVideos} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default Home;
