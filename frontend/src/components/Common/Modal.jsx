import React from "react";

function Modal({ show, onClose, title, children }) {
  if (!show) return null;

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
            <h5 className="modal-title">{title}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
