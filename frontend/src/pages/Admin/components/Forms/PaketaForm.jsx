import React from "react";
import Input from "./Common/Input";
import Select from "./Common/Select";
import TextArea from "./Common/TextArea";

function PaketaForm({ form, setForm, onSubmit, isEdit = false }) {
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

      <TextArea
        label="Pershkrimi"
        value={form.pershkrimi}
        name="pershkrimi"
        onChange={(v) => handleChange("pershkrimi", v)}
      />

      <Input
        type="number"
        label="Hapesira (GB)"
        value={form.hapesira_gb}
        name="hapesira_gb"
        onChange={(v) => handleChange("hapesira_gb", v)}
      />

      <Input
        type="number"
        label="Bandwidth (GB)"
        value={form.bandwidth_gb}
        name="bandwidth_gb"
        onChange={(v) => handleChange("bandwidth_gb", v)}
      />

      <Input
        type="number"
        label="Numri Domain-eve"
        value={form.nr_domaineve}
        name="nr_domaineve"
        onChange={(v) => handleChange("nr_domaineve", v)}
      />

      <Input
        type="number"
        label="Numri E-Mail-eve"
        value={form.nr_emaileve}
        name="nr_emaileve"
        onChange={(v) => handleChange("nr_emaileve", v)}
      />

      <Select
        label="Ka SSL?"
        value={form.ssl}
        name="ssl"
        onChange={(v) => handleChange("ssl", v === "true")}
        options={[
          { value: true, label: "Po" },
          { value: false, label: "Jo" },
        ]}
      />

      <Input
        type="number"
        label="Cmimi Mujor (€)"
        value={form.cmimi_mujor}
        name="cmimi_mujor"
        onChange={(v) => handleChange("cmimi_mujor", v)}
      />

      <Input
        type="number"
        label="Cmimi Vjetor (€)"
        value={form.cmimi_vjetor}
        name="cmimi_vjetor"
        onChange={(v) => handleChange("cmimi_vjetor", v)}
      />

      <Select
        label="Statusi"
        value={form.statusi}
        name="statusi"
        onChange={(v) => handleChange("statusi", v)}
        options={[
          { value: "aktiv", label: "aktiv" },
          { value: "jo-aktiv", label: "jo-aktiv" },
        ]}
      />

      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Pakete" : "Shto Pakete"}
      </button>
    </form>
  );
}

export default PaketaForm;
