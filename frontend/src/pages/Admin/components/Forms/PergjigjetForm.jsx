import React, { useEffect } from "react";
import Select from "./Common/Select";
import useAdminCrud from "../../../../hooks/useAdminCrud";

function PergjigjetForm({ form, setForm, onSubmit, isEdit = false }) {
  const { data: tiketa, getAll } = useAdminCrud("tiketa");

  useEffect(() => {
    getAll();
  }, []);

  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Tiketi</label>
        <select
          className="form-select"
          value={form.tiketi_id}
          onChange={(e) => handleChange("tiketi_id", Number(e.target.value))}
          required
        >
          <option value="">-- Zgjedh Tiketin --</option>
          {tiketa &&
            tiketa.map((t) => (
              <option key={t.id} value={t.id}>
                #{t.id} - {t.titulli} ({t.statusi})
              </option>
            ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Autori</label>
        <input
          type="text"
          className="form-control"
          value={form.autori}
          onChange={(e) => handleChange("autori", e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mesazhi</label>
        <input
          type="text"
          className="form-control"
          value={form.mesazhi}
          onChange={(e) => handleChange("mesazhi", e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Pergjigja</label>
        <input
          type="text"
          className="form-control"
          value={form.pergjigja}
          onChange={(e) => handleChange("pergjigja", e.target.value)}
          required
        />
      </div>

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

      <button className="btn btn-primary mt-2" type="submit">
        {isEdit ? "Perditso Pergjigjen" : "Shto Pergjigjen"}
      </button>
    </form>
  );
}

export default PergjigjetForm;
