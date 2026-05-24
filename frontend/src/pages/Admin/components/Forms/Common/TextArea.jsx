import React from "react";

function TextArea({ label, value, name, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        Pershkrimi
      </label>
      <textarea
        className="form-control fs-5"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={name}
        name={name}
        cols={10}
      />
    </div>
  );
}

export default TextArea;
