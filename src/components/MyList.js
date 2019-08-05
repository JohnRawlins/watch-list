import React from 'react';
import Navbar from './Navbar.js';
import MediaList from './MediaList.js';
import RemoveMediaModal from './RemoveMediaModal.js';
import Media from './Media.js';
import '../css/mylist.scss';

const MyList = () => {
  let mediaItems = [
    <Media
      info={{
        title: 'The Punisher',
        year: '2017–2019',
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTExODIwOTUxNzFeQTJeQWpwZ15BbWU4MDE5MDA0MTcz._V1_SX300.jpg'
      }}
    />,
    <Media
      info={{
        title: 'The Shining',
        year: '1980',
        poster:
          'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
      }}
    />,
    <Media
      info={{
        title: 'Hellboy',
        year: '2019',
        poster:
          'https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg'
      }}
    />
  ];

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
      <MediaList mediaList={mediaItems} />
      {/* <RemoveMediaModal /> */}
    </div>
  );
};

export default MyList;
