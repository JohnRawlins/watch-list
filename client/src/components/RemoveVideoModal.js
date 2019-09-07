import React, { useContext } from 'react';
import '../css/remove-video-modal.scss';
import MyVideoListContext from './context/my-video-list/myVideoListContext.js';

const RemoveVideoModal = () => {
  const {
    setRemoveVideoModal,
    removeVideoFromWatchList,
    removeVideoModal
  } = useContext(MyVideoListContext);

  const handleSelection = event => {
    const btnSelection = event.target.textContent.toLowerCase();
    if (btnSelection === 'yes') {
      removeVideoFromWatchList(removeVideoModal.videoID);
    } else {
      setRemoveVideoModal(false);
    }
  };

  return (
    <div className="remove-video-modal">
      <div className="modal-message">
        <p className="modal-message__text">
          Remove This Item From Your Watch List?
        </p>
        <h1 className="modal-message__video-title">
          {removeVideoModal.videoTitle}
        </h1>
        <div className="modal-btns" onClick={handleSelection}>
          <button className="modal-btns__no">No</button>
          <button className="modal-btns__yes">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveVideoModal;
