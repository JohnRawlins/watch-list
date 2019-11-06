import React from 'react';
import '../css/popular-videos.scss';
import testData from './testData';

const PopularVideos = () => {
  let videoList = testData.reduce((videoList, video) => {
    if (video.original_language === 'en') {
      videoList.push(
        <li key={video.id} className="popular-video">
          <img
            className="popular-video__poster"
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${video.poster_path}`}
            alt="Video Poster"
          />
          <span className="popular-video__title">{video.original_title}</span>
        </li>
      );
    }
    return videoList;
  }, []);
  return (
    <div className="popular-videos-container">
      <h2 className="popular-videos-container__title">Popular</h2>
      <ul className="popular-video-list">{videoList}</ul>
    </div>
  );
};

export default PopularVideos;
