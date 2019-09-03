import React from 'react';
import Video from './Video';
import '../css/video-list.scss';

const VideoList = ({ videoSearchResults, videoSearchResultsTotal }) => {
  videoSearchResults = videoSearchResults.map((video, index) => {
    return (
      <Video
        key={index.toString()}
        info={{
          title: video.Title,
          year: video.Year,
          poster: video.Poster
        }}
      />
    );
  });

  const centerVideoList =
    videoSearchResults.length === 1 ? { justifyItems: 'center' } : {};

  return (
    <>
      <p className="search-total">
        Results:
        <span className="search-total__num">{videoSearchResultsTotal}</span>
      </p>
      <ul className="video-list" style={centerVideoList}>{videoSearchResults}</ul>
    </>
  );
};

export default VideoList;
