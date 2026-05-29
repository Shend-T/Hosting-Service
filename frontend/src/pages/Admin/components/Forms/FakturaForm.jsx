import React from "react";
import Input from "./Common/Input";
import Select from "./Common/Select";

function FakturaForm({ form, setForm, onSubmit, isEdit = false }) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Klienti ID"
        type="number"
        value={form.klienti_id}
        name="klienti_id"
        onChange={(v) => handleChange("klienti_id", Number(v))}
      />
      <Input
        label="Abonimi ID"
        type="number"
        value={form.abonimi_id}
        name="abonimi_id"
        onChange={(v) => handleChange("abonimi_id", Number(v))}
      />
      <Input
        label="Shuma (€)"
        type="number"
        value={form.shuma}
        name="shuma"
        onChange={(v) => handleChange("shuma", Number(v))}
      />
      <Input
        label="Data Leshimit"
        type="date"
        value={form.data_leshimit}
        name="data_leshimit"
        onChange={(v) => handleChange("data_leshimit", v)}
      />
      <Input
        label="Data Skadimit"
        type="date"
        value={form.data_skadimit}
        name="data_skadimit"
        onChange={(v) => handleChange("data_skadimit", v)}
      />
      <Select
        label="Statusi"
        value={form.statusi}
        name="statusi"
        onChange={(v) => handleChange("statusi", v)}
        options={[
          { value: "papaguar", label: "E papaguar" },
          { value: "paguar", label: "E paguar" },
          { value: "anuluar", label: "E anuluar" },
        ]}
      />
      <Input
        label="Pershkrimi"
        value={form.pershkrimi}
        name="pershkrimi"
        onChange={(v) => handleChange("pershkrimi", v)}
      />
      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Faturën" : "Shto Faturën"}
      </button>
    </form>
  );
}

export default FakturaForm;