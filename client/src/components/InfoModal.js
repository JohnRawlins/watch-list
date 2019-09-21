import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from './context/auth/authContext';
import MyVideoListContext from './context/my-video-list/myVideoListContext.js';
import ReviewContext from './context/review/reviewContext';
import '../css/remove-video-modal.scss';

const InfoModal = ({ history }) => {
  const {
    setRemoveVideoModal,
    clearInfoModalMsg,
    clearUsersVideoInfo,
    infoModalMsg
  } = useContext(MyVideoListContext);
  const { tokenStatus, setTokenStatus, logUserOut } = useContext(AuthContext);

  const {
    clearWriteReviewResp,
    setDeleteReviewModal,
    clearUsersReviewInfo
  } = useContext(ReviewContext);

  const handleSelection = event => {
    if (tokenStatus.expiredToken && event.target.textContent.toLowerCase() === 'ok') {
      setTokenStatus(false, '', false);
      logUserOut();
      clearUsersVideoInfo();
      clearUsersReviewInfo();
      history.push('/login');
    } else if (event.target.textContent.toLowerCase() === 'ok') {
      setTokenStatus(false, '', false);
      setRemoveVideoModal(false);
      clearInfoModalMsg();
      clearWriteReviewResp();
      setDeleteReviewModal(false);
    }
  };

  return infoModalMsg || tokenStatus.msg ? (
    <div className="info-modal">
      <div className="info-modal-message">
        <p className="info-modal-message__text">
          {tokenStatus.msg|| infoModalMsg}
        </p>
        <div className="info-modal-btns">
          <button onClick={handleSelection} className="info-modal-btns__ok">
            ok
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default withRouter(InfoModal);
