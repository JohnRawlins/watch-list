import React from 'react';
import Navbar from './Navbar';
import VideoList from './VideoList';
import RemoveVideoModal from './RemoveVideoModal';
import Video from './Video';
import '../css/mylist.scss';
import defaultPoster from '../img/default-poster.svg';

const MyList = () => {
  // let videoItems = [
  //   <Video
  //     info={{
  //       title: 'The Punisher',
  //       year: '2017–2019',
  //       poster:
  //         'https://m.media-amazon.com/images/M/MV5BMTExODIwOTUxNzFeQTJeQWpwZ15BbWU4MDE5MDA0MTcz._V1_SX300.jpg'
  //     }}
  //   />,
  //   <Video
  //     info={{
  //       title: '28 Days Later',
  //       year: '2002',
  //       poster:
  //         'https://m.media-amazon.com/images/M/MV5BYTFkM2ViMmQtZmI5NS00MjQ2LWEyN2EtMTI1ZmNlZDU3MTZjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  //     }}
  //   />,
  //   <Video
  //     info={{
  //       title: 'Hellboy',
  //       year: '2019',
  //       poster: defaultPoster
  //     }}
  //   />
  // ];

  return (
    <div className="mylist">
      <Navbar />
      <header className="mylist-header">
        <h1 className="mylist-header__title">My List</h1>
        <select className="mylist-sort">
          <option className="mylist-sort__ascending">Title A to Z</option>
          <option className="mylist-sort__descending">Title Z to A</option>
        </select>
      </header>
      {/* <VideoList videoList={videoItems} /> */}
      {/* <RemoveVideoModal /> */}
    </div>
  );
};

export default MyList;
