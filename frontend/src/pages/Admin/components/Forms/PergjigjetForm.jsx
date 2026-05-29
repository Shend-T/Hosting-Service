import React from "react";
import Input from "./Common/Input";
import Select from "./Common/Select";

function PergjigjetForm({ form, setForm, onSubmit, isEdit = false }) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Tiketi ID"
        type="number"
        value={form.tiketi_id}
        name="tiketi_id"
        onChange={(v) => handleChange("tiketi_id", Number(v))}
      />
      <Input
        label="Autori"
        value={form.autori}
        name="autori"
        onChange={(v) => handleChange("autori", v)}
      />
      <Input
        label="Mesazhi"
        value={form.mesazhi}
        name="mesazhi"
        onChange={(v) => handleChange("mesazhi", v)}
      />
      <Input
        label="Pergjigja"
        value={form.pergjigja}
        name="pergjigja"
        onChange={(v) => handleChange("pergjigja", v)}
      />
      <Select
        label="Lloji"
        value={form.lloji}
        name="lloji"
        onChange={(v) => handleChange("lloji", v)}
        options={[
          { value: "klient", label: "Klient" },
          { value: "admin", label: "Admin" },
        ]}
      />
      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Pergjigjen" : "Shto Pergjigjen"}
      </button>
    </form>
  );
}

export default PergjigjetForm;