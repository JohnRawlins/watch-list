import React, { useContext } from 'react';
import { Spring } from 'react-spring/renderprops';
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
      removeVideoFromWatchList(
        removeVideoModal.videoID,
        removeVideoModal.videoImdbID
      );
    } else {
      setRemoveVideoModal(false);
    }
  };

  return (
    <div className="remove-video-modal">
      <Spring
        from={{ transform: 'scale(0)', opacity: 0 }}
        to={{ transform: 'scale(1)', opacity: 1 }}
      >
        {animation => (
          <div style={animation} className="modal-message">
            <p className="modal-message__text">
              Remove this item from your watch list?
            </p>
            <h1 className="modal-message__video-title">
              {removeVideoModal.videoTitle}
            </h1>
            <div className="modal-btns" onClick={handleSelection}>
              <button className="modal-btns__no">No</button>
              <button className="modal-btns__yes">Yes</button>
            </div>
          </div>
        )}
      </Spring>
    </div>
  );
};

export default RemoveVideoModal;
