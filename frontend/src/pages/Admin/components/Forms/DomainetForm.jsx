import React from "react";
import Input from "./Common/Input";
import Select from "./Common/Select";

function DomainetForm({
  form,
  setForm,
  onSubmit,
  isEdit = false,
  klientiOptions = [],
  llogariHostingsOptions = [],
}) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]:
        field === "klienti_id" || field === "llogari_hostings_id"
          ? Number(value)
          : value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Klienti"
        value={form.klienti_id}
        name="klienti_id"
        onChange={(v) => handleChange("klienti_id", v)}
        options={[
          { value: "", label: "Zgjidh klientin" },
          ...klientiOptions.map((k) => ({
            value: k.id,
            label: `#${k.id} - ${k.emri} ${k.mbiemri}`,
          })),
        ]}
      />

      <Select
        label="Llogaria e Hostingut"
        value={form.llogari_hostings_id}
        name="llogari_hostings_id"
        onChange={(v) => handleChange("llogari_hostings_id", v)}
        options={[
          { value: "", label: "Zgjidh llogarine" },
          ...llogariHostingsOptions.map((l) => ({
            value: l.id,
            label: `#${l.id} - ${l.username}`,
          })),
        ]}
      />

      <Input
        label="Emri i Domainit"
        value={form.emri_domainit}
        name="emri_domainit"
        onChange={(v) => handleChange("emri_domainit", v)}
      />

      <Input
        label="TLD"
        value={form.tld}
        name="tld"
        onChange={(v) => handleChange("tld", v)}
      />

      <Input
        label="Nameserverat"
        value={form.nameserverat}
        name="nameserverat"
        onChange={(v) => handleChange("nameserverat", v)}
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
        label="Data Regjistrimit"
        type="date"
        value={form.data_regjistrimit}
        name="data_regjistrimit"
        onChange={(v) => handleChange("data_regjistrimit", v)}
      />

      <Input
        label="Data Skadimit"
        type="date"
        value={form.data_skadimit}
        name="data_skadimit"
        onChange={(v) => handleChange("data_skadimit", v)}
      />

      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Domain" : "Shto Domain"}
      </button>
    </form>
  );
}

export default DomainetForm;
