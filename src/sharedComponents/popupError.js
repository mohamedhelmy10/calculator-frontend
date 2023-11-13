import React from 'react'

const PopupError = ({ message, onClose }) => {
    return (
      <div className="popup-error">
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
};
export default PopupError;