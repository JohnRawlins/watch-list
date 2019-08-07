import React from 'react';
import Media from './Media.js';
import '../css/media-list.scss';

const MediaList = (props) => {
  return (
    <ul className="media-list">
        {props.mediaList}
    </ul>
  );
};

export default MediaList;
