import React from "react";
import Input from "./Common/Input";
import Select from "./Common/Select";

function KlientiForm({ form, setForm, onSubmit, isEdit = false }) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Emri"
        value={form.emri}
        name="emri"
        onChange={(v) => handleChange("emri", v)}
      />

      <Input
        label="Mbiemri"
        value={form.mbiemri}
        name="mbiemri"
        onChange={(v) => handleChange("mbiemri", v)}
      />

      <Input
        label="Kompania"
        value={form.kompania}
        name="kompania"
        onChange={(v) => handleChange("kompania", v)}
      />

      <Input
        label="Email"
        type="email"
        value={form.email}
        name="email"
        onChange={(v) => handleChange("email", v)}
      />

      {!isEdit && (
        <Input
          label="Password-i"
          type="password"
          value={form.password}
          name="password"
          onChange={(v) => handleChange("password", v)}
        />
      )}

      <Input
        label="Telefoni"
        value={form.telefoni}
        name="telefoni"
        onChange={(v) => handleChange("telefoni", v)}
      />

      <Input
        label="Adresa"
        value={form.adresa}
        name="adresa"
        onChange={(v) => handleChange("adresa", v)}
      />

      <Input
        label="Bilanci"
        type="number"
        value={form.bilanci}
        name="bilanci"
        onChange={(v) => handleChange("bilanci", Number(v))}
      />

      <Select
        label="Statusi"
        value={form.statusi}
        name="statusi"
        onChange={(v) => handleChange("statusi", v)}
        options={[
          { value: "aktiv", label: "aktiv" },
          { value: "jo-aktiv", label: "jo-aktiv" },
          { value: "suspenduar", label: "suspenduar" },
        ]}
      />

      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Klient" : "Shto Klient"}
      </button>
    </form>
  );
}

export default KlientiForm;
