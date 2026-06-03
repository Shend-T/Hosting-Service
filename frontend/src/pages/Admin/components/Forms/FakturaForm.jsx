import React, { useEffect } from "react";
import Select from "./Common/Select";
import useAdminCrud from "../../../../hooks/useAdminCrud";

function FakturaForm({ form, setForm, onSubmit, isEdit = false }) {
  const { data: klientet, getAll: getAllKlientet } = useAdminCrud("klienti");
  const { data: abonimet, getAll: getAllAbonimet } = useAdminCrud("abonimi");

  useEffect(() => {
    getAllKlientet();
    getAllAbonimet();
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
              #{k.id} - {k.emri} {k.mbiemri} ({k.email})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Abonimi</label>
        <select
          className="form-select"
          value={form.abonimi_id}
          onChange={(e) => handleChange("abonimi_id", Number(e.target.value))}
          required
        >
          <option value="">-- Zgjedh Abonimin --</option>
          {abonimet && abonimet.map((a) => (
            <option key={a.id} value={a.id}>
              #{a.id} - Klienti {a.klienti_id} ({a.statusi})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Shuma (€)</label>
        <input
          type="number"
          className="form-control"
          value={form.shuma}
          onChange={(e) => handleChange("shuma", Number(e.target.value))}
          required
          min={0}
          step="0.01"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data Leshimit</label>
        <input
          type="date"
          className="form-control"
          value={form.data_leshimit}
          onChange={(e) => handleChange("data_leshimit", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data Skadimit</label>
        <input
          type="date"
          className="form-control"
          value={form.data_skadimit}
          onChange={(e) => handleChange("data_skadimit", e.target.value)}
        />
      </div>

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

      <div className="mb-3">
        <label className="form-label">Pershkrimi</label>
        <input
          type="text"
          className="form-control"
          value={form.pershkrimi}
          onChange={(e) => handleChange("pershkrimi", e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-2" type="submit">
        {isEdit ? "Perditso Faturën" : "Shto Faturën"}
      </button>
    </form>
  );
}

export default FakturaForm;