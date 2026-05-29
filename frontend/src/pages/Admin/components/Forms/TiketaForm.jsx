import React from "react";
import Input from "./Common/Input";
import Select from "./Common/Select";

function TiketaForm({ form, setForm, onSubmit, isEdit = false }) {
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
        label="Titulli"
        value={form.titulli}
        name="titulli"
        onChange={(v) => handleChange("titulli", v)}
      />
      <Input
        label="Pershkrimi"
        value={form.pershkrimi}
        name="pershkrimi"
        onChange={(v) => handleChange("pershkrimi", v)}
      />
      <Input
        label="Kategoria"
        value={form.kategoria}
        name="kategoria"
        onChange={(v) => handleChange("kategoria", v)}
      />
      <Select
        label="Prioriteti"
        value={form.prioriteti}
        name="prioriteti"
        onChange={(v) => handleChange("prioriteti", v)}
        options={[
          { value: "i_ulet", label: "I ulet" },
          { value: "normal", label: "Normal" },
          { value: "i_larte", label: "I larte" },
          { value: "urgjent", label: "Urgjent" },
        ]}
      />
      <Select
        label="Statusi"
        value={form.statusi}
        name="statusi"
        onChange={(v) => handleChange("statusi", v)}
        options={[
          { value: "hapur", label: "Hapur" },
          { value: "ne_proces", label: "Ne Proces" },
          { value: "mbyllur", label: "Mbyllur" },
        ]}
      />
      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Tiketin" : "Shto Tiketin"}
      </button>
    </form>
  );
}

export default TiketaForm;