import React from 'react';
import Video from './Video.js';
import '../css/video-list.scss';

const VideoList = props => {
  return <ul className="video-list">{props.videoList}</ul>;
};

export default VideoList;
