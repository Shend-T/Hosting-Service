import React from "react";

function ProgressBar({ usedPercent, totalPercent, text }) {
  return (
    <div
      className="progress fs-5 text-white"
      role="progressbar"
      style={{ height: "20px", backgroundColor: "#bbc8ca" }}
    >
      <div
        className={`progress-bar ${
          usedPercent > 80 ? "bg-danger" : "bg-success"
        }`}
        style={{
          width: `${usedPercent}%`,
        }}
      >
        {text}%
      </div>
    </div>
  );
}

export default ProgressBar;
