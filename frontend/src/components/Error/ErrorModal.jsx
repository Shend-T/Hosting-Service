import React from "react";

function ErrorModal({ show, onClose, errorCode, errorBody, errorText }) {
  if (!show) return null;

  console.log(errorBody);

  return (
    <div
      className="modal show d-block fs-5"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.66)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content" style={{ padding: "1vh 1vw" }}>
          <div className="modal-header">
            <h5 className="modal-title">
              Error: {errorCode} - {errorBody.message}
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">{errorText}</div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Mbyll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
