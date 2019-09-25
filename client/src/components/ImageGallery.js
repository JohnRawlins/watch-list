import React from 'react';
import '../css/image-gallery.scss';
import galleryImage01 from '../img/gallery-image01.jpg';
import galleryImage02 from '../img/gallery-image02.jpg';
import galleryImage03 from '../img/gallery-image03.jpg';
import galleryImage04 from '../img/gallery-image04.jpg';

const ImageGallery = () => {
  const images = [
    <div
      key="1"
      className="image-gallery__img"
      style={{ backgroundImage: `url(${galleryImage01})` }}
    ></div>,
    ,
    <div
      key="4"
      className="image-gallery__img"
      style={{ backgroundImage: `url(${galleryImage04})` }}
    ></div>,
    <div
      key="3"
      className="image-gallery__img"
      style={{ backgroundImage: `url(${galleryImage03})` }}
    ></div>,

    ,
    <div
      key="2"
      className="image-gallery__img"
      style={{ backgroundImage: `url(${galleryImage02})` }}
    ></div>
  ];
  return <div className="image-gallery">{images}</div>;
};

export default ImageGallery;
