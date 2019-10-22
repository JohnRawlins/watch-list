import React from 'react';
import Video from './Video';
import '../css/video-list.scss';
import VideoListPlaceHolder from './VideoListPlaceholder';

const VideoList = ({ isLoading, videoItems, videoItemsTotal }) => {
  videoItems = videoItems.map((video, index) => {
    return (
      <Video
        key={index.toString()}
        info={{
          Title: video.Title,
          Year: video.Year,
          Poster: video.Poster,
          videoID: video._id,
          imdbID: video.imdbID,
          userReviewScore: video.userReviewScore
        }}
      />
    );
  });
  return (
    <>
      <p className="search-total">
        Results:
        <span className="search-total__num">{videoItemsTotal}</span>
      </p>
      <ul className="video-list">
        {isLoading ? <VideoListPlaceHolder /> : videoItems}
      </ul>
    </>
  );
};

export default VideoList;
