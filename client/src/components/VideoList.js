import React from 'react';
import Video from './Video';
import '../css/video-list.scss';
import popcorn from '../img/popcorn.svg';

const VideoList = props => {
  let videoSearchResults = props.videoList;

  const removeGames = (videoList, currentVideo) => {
    if (currentVideo.Type !== 'game') {
      let video = (
        <Video
          key={currentVideo.imdbID}
          info={{
            title: currentVideo.Title,
            year: currentVideo.Year,
            poster: currentVideo.Poster
          }}
        />
      );
      videoList.push(video);
    }
    return videoList;
  };

  videoSearchResults = videoSearchResults.reduce(removeGames, []);

  return <ul className="video-list">{videoSearchResults}</ul>;
};

export default VideoList;
