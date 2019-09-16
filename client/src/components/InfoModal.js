import React, { useContext } from 'react';
import '../css/remove-video-modal.scss';
import MyVideoListContext from './context/my-video-list/myVideoListContext.js';
import ReviewContext from './context/review/reviewContext';

const InfoModal = ({ msg }) => {
  const { setRemoveVideoModal, clearVideoInfoModalMsg } = useContext(
    MyVideoListContext
  );

  const { clearWriteReviewResp, setDeleteReviewModal } = useContext(ReviewContext);

  const handleSelection = event => {
    if (event.target.textContent.toLowerCase() === 'ok') {
      setRemoveVideoModal(false);
      clearVideoInfoModalMsg();
      clearWriteReviewResp();
      setDeleteReviewModal(false);
    }
  };

  return (
    <div className="info-modal">
      <div className="info-modal-message">
        <p className="info-modal-message__text">{msg}</p>
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
