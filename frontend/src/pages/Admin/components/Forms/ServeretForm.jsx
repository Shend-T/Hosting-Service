import React from "react";
import Input from "./Common/Input";
import Select from "./Common/Select";

function ServeretForm({ form, setForm, onSubmit, isEdit = false }) {
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
        label="IP Adresa"
        value={form.ip_adresa}
        name="ip_adresa"
        onChange={(v) => handleChange("ip_adresa", v)}
      />

      <Select
        label="Lloji"
        value={form.lloji}
        name="lloji"
        onChange={(v) => handleChange("lloji", v)}
        options={[
          { value: "web", label: "web" },
          { value: "mail", label: "mail" },
        ]}
      />

      <Select
        label="Sistemi Operativ"
        value={form.sistemi_operativ}
        name="sistemi_operativ"
        onChange={(v) => handleChange("sistemi_operativ", v)}
        options={[
          { value: "ubuntu", label: "ubuntu" },
          { value: "debian", label: "debian" },
          { value: "rhel", label: "rhel" },
        ]}
      />

      <Input
        label="RAM (GB)"
        type="number"
        value={form.ram_gb}
        name="ram_gb"
        onChange={(v) => handleChange("ram_gb", Number(v))}
      />

      <Input
        label="CPU Core"
        type="number"
        value={form.cpu_core}
        name="cpu_core"
        onChange={(v) => handleChange("cpu_core", Number(v))}
      />

      <Input
        label="Hapesira (TB)"
        type="number"
        value={form.hapesira_tb}
        name="hapesira_tb"
        onChange={(v) => handleChange("hapesira_tb", Number(v))}
      />

      <Input
        label="Lokacioni"
        value={form.lokacioni}
        name="lokacioni"
        onChange={(v) => handleChange("lokacioni", v)}
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

      <Input
        label="Data Instalimit"
        type="date"
        value={form.data_instalimit}
        name="data_instalimit"
        onChange={(v) => handleChange("data_instalimit", v)}
      />

      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Server" : "Shto Server"}
      </button>
    </form>
  );
}

export default ServeretForm;
