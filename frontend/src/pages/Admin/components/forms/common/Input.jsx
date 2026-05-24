import React from "react";

function Input({ label, value, name, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-control fs-5"
        type={type}
        value={value}
        id={name}
        name={name}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
      />
    </div>
  );
}

export default Input;
