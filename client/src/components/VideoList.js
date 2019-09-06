import React from 'react';
import Video from './Video';
import '../css/video-list.scss';

const VideoList = ({ videoItems, videoItemsTotal }) => {

  videoItems = videoItems.map((video, index) => {
    return (
      <Video
        key={index.toString()}
        info={{
          Title: video.Title,
          Year: video.Year,
          Poster: video.Poster
        }}
      />
    );
  });

  const centerVideoList =
    videoItems.length === 1 ? { justifyItems: 'center' } : {};
  return (
    <>
      <p className="search-total">
        Results:
        <span className="search-total__num">{videoItemsTotal}</span>
      </p>
      <ul className="video-list" style={centerVideoList}>
        {videoItems}
      </ul>
    </>
  );
};

export default VideoList;
