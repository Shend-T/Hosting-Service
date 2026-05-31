import React from "react";

function DateInput({ label, value, name, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-control fs-5"
        type="date"
        min={new Date().toISOString().split("T")[0]}
        value={value}
        id={name}
        name={name}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default DateInput;
