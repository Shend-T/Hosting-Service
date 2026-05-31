import React, { useMemo } from "react";

import Input from "./Common/Input";
import DateInput from "./Common/DateInput";
import Select from "./Common/Select";

function AbonimiForm({
  form,
  setForm,
  onSubmit,
  klientet,
  paketat,
  isEdit = false,
}) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const addOneMonth = (dateStr) => {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split("T")[0];
  };
  const addOneYear = (dateStr) => {
    const date = new Date(dateStr);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0];
  };

  const lastUpdate = () => {
    setForm({
      ...form,
      cmimi:
        form.periudha === "mujore"
          ? Number(selectedPaketa?.cmimi_mujor)
          : Number(selectedPaketa?.cmimi_vjetor),
      data_skadimit:
        form.periudha === "mujore"
          ? addOneMonth(new Date().toISOString().split("T")[0])
          : addOneYear(new Date().toISOString().split("T")[0]),
    });
  };

  const klientetList = useMemo(
    () =>
      klientet.map((klienti) => ({
        value: klienti.id,
        label: `Klienti #${klienti.id} - ${klienti.emri} ${klienti.mbiemri}`,
      })),
    [klientet],
  );
  const paketatList = useMemo(
    () =>
      paketat.map((paketa) => ({
        value: paketa.id,
        label: `Paketa #${paketa.id} - ${paketa.emri}`,
      })),
    [paketat],
  );

  const selectedPaketa = useMemo(
    () => paketat.find((p) => p.id === form.paketa_id),
    [paketat, form.paketa_id],
  );

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Klienti"
        value={form.klienti_id}
        name="klienti_id"
        onChange={(v) => handleChange("klienti_id", Number(v))}
        options={klientetList}
      />
      <Select
        label="Paketa"
        value={form.paketa_id}
        name="paketa_id"
        onChange={(v) => handleChange("paketa_id", Number(v))}
        options={paketatList}
      />

      <DateInput
        label="Data Fillimit"
        value={form.data_fillimit}
        name="data_fillimit"
        onChange={(v) => handleChange("data_fillimit", v)}
      />

      <Select
        label="Auto Rinovim?"
        value={form.auto_rinovim}
        name="auto_rinovim"
        onChange={(v) => handleChange("auto_rinovim", v === "true")}
        options={[
          { value: true, label: "Po" },
          { value: false, label: "Jo" },
        ]}
      />
      <Select
        label="Statusi"
        value={form.statusi}
        name="statusi"
        onChange={(v) => handleChange("statusi", v)}
        options={[
          { value: "aktiv", label: "Aktiv" },
          { value: "pritje", label: "Prijte" },
          { value: "suspenduar", label: "Suspenduar" },
          { value: "skaduar", label: "Skaduar" },
          { value: "ndalur", label: "Ndalur" },
        ]}
      />

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

      <div className="mb-3">
        <label className="form-label" htmlFor="cmimi">
          Cmimi (€)
        </label>
        <input
          className="form-control fs-5"
          type="number"
          disabled
          value={
            form.periudha === "mujore"
              ? selectedPaketa?.cmimi_mujor
              : selectedPaketa?.cmimi_vjetor
          }
          id="cmimi"
          name="cmimi"
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="data_skadimit">
          Data Skadimit
        </label>
        <input
          className="form-control fs-5"
          type="date"
          value={
            form.periudha === "mujore"
              ? addOneMonth(new Date().toISOString().split("T")[0])
              : addOneYear(new Date().toISOString().split("T")[0])
          }
          id="data_skadimit"
          name="data_skadimit"
          disabled
        />
      </div>

      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => lastUpdate()}
      >
        {isEdit ? "Perditso Abonim" : "Shto Abonim"}
      </button>
    </form>
  );
}

export default AbonimiForm;
