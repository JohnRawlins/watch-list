import React, { useContext } from 'react';
import '../css/remove-video-modal.scss';
import MyVideoListContext from './context/my-video-list/myVideoListContext.js';

const InfoModal = () => {
  const { removeVideoModal, setRemoveVideoModal } = useContext(
    MyVideoListContext
  );

  const handleSelection = event => {
    if (event.target.textContent.toLowerCase() === 'ok') {
      setRemoveVideoModal(false);
    }
  };

  return (
    <div className="info-modal">
      <div className="info-modal-message">
        <p className="info-modal-message__text">{removeVideoModal.response}</p>
        <div className="info-modal-btns">
          <button onClick={handleSelection} className="info-modal-btns__ok">
            ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
