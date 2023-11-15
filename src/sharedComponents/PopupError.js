import React from 'react'
import './popup-error.css';

const PopupError = ({ message, onClose }) => {
    return (
      <div className="popup">
        <div className="content">
          <p className="message">{message}</p>
          <button className="closeButton" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
};
export default PopupError;