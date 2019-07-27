import React from 'react';
import Media from './Media.js';
import '../css/media-list.scss';

const MediaList = (props) => {
  return (
    <div className="media-list">
        {props.movielist}
    </div>
  );
};

export default MediaList;
