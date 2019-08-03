import React from 'react';
import '../css/remove-media-modal.scss';

const RemoveMediaModal = () => {
  return (
    <div className="remove-media-modal">
      <div className="modal-message">
        <p className="modal-message__text">
          Remove This Item From Your Watch List?
        </p>
        <h1 className="modal-message__media-title">The Punisher </h1>
        <div className="modal-btns">
          <button className="modal-btns__no">No</button>
          <button className="modal-btns__yes">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveMediaModal;
