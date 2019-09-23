import React from 'react';

const ImageGallery = () => {
    let images = [
        <img className="image-gallery__img" src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1040&q=80" alt="Gallery"/>,
        <img className="image-gallery__img" src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Gallery" />,
        <img className="image-gallery__img" src="https://images.unsplash.com/photo-1547130542-00f463cf8c0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80" alt="Gallery" />,
        <img className="image-gallery__img" src="https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Gallery" />

        
        
    ]
  return <div className="image-gallery">
      {images}
      </div>;
};

export default ImageGallery;
