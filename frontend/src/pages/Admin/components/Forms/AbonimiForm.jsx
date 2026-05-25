import React from "react";

import Input from "./Common/Input";
import Select from "./Common/Select";
import TextArea from "./Common/TextArea";

function AbonimiForm({ form, setForm, onSubmit, isEdit = false }) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Periudha"
        value={form.periudha}
        name="periudha"
        onChange={(v) => handleChange("periudha", v)}
        options={[
          { value: "mujore", label: "Mujore" },
          { value: "vjetore", label: "Vjetore" },
        ]}
      />
      <Select
        label="Auto Rinovim?"
        value={form.auto_rinovim}
        name="auto_rinovim"
        onChange={(v) => handleChange("auto_rinovim", Boolean(v))}
        options={[
          { value: true, label: "Po" },
          { value: false, label: "Jo" },
        ]}
      />

      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Pakete" : "Shto Pakete"}
      </button>
    </form>
  );
}

export default AbonimiForm;
