import React from 'react';
import VideoListPlaceholder from './VideoListPlaceholder';
import { Link } from 'react-router-dom';
import '../css/popular-videos.scss';

const PopularVideos = ({ popularVideos, isLoading }) => {
  if (popularVideos) {
    popularVideos = popularVideos.reduce((videos, video) => {
      if (video) {
        videos.push(
          <li key={video.id} className="popular-video-wrapper">
            <Link
              to={`/video-profile/${video.title.replace('?', '')}/${
                video.imdbID
              }`}
              className="popular-video"
            >
              <img
                className="popular-video__poster"
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${video.poster_path}`}
                alt="Video Poster"
              />
              <span className="popular-video__title">{video.title}</span>
            </Link>
          </li>
        );
      }
      return videos;
    }, []);
  }
  return isLoading ? (
    <VideoListPlaceholder />
  ) : (
    <div className="popular-videos-container">
      <h2 className="popular-videos-container__title">Popular</h2>
      <ul className="popular-video-list">{popularVideos}</ul>
    </div>
  );
};

export default PopularVideos;
