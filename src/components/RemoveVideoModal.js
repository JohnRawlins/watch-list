import React from 'react';
import '../css/remove-video-modal.scss';

const RemoveVideoModal = () => {
  return (
    <div className="remove-video-modal">
      <div className="modal-message">
        <p className="modal-message__text">
          Remove This Item From Your Watch List?
        </p>
        <h1 className="modal-message__video-title">The Punisher </h1>
        <div className="modal-btns">
          <button className="modal-btns__no">No</button>
          <button className="modal-btns__yes">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveVideoModal;
