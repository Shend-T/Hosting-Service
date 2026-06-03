import React, { useEffect } from "react";
import Select from "./Common/Select";
import useAdminCrud from "../../../../hooks/useAdminCrud";

function TiketaForm({ form, setForm, onSubmit, isEdit = false }) {
  const { data: klientet, getAll } = useAdminCrud("klienti");

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
        <label className="form-label">Klienti</label>
        <select
          className="form-select"
          value={form.klienti_id}
          onChange={(e) => handleChange("klienti_id", Number(e.target.value))}
          required
        >
          <option value="">-- Zgjedh Klientin --</option>
          {klientet && klientet.map((k) => (
            <option key={k.id} value={k.id}>
              #{k.id} - {k.emri} {k.mbiemri}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Titulli</label>
        <input
          type="text"
          className="form-control"
          value={form.titulli}
          onChange={(e) => handleChange("titulli", e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Pershkrimi</label>
        <input
          type="text"
          className="form-control"
          value={form.pershkrimi}
          onChange={(e) => handleChange("pershkrimi", e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Kategoria</label>
        <input
          type="text"
          className="form-control"
          value={form.kategoria}
          onChange={(e) => handleChange("kategoria", e.target.value)}
          required
        />
      </div>

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
      <button className="btn btn-primary mt-2" type="submit">
        {isEdit ? "Perditso Tiketin" : "Shto Tiketin"}
      </button>
    </form>
  );
}

export default TiketaForm;