import React from "react";
import Input from "./Common/Input";
import Select from "./Common/Select";

function LlogariHostingsForm({
  form,
  setForm,
  onSubmit,
  isEdit = false,
  abonimiOptions = [],
  serverOptions = [],
}) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]:
        field === "abonimi_id" || field === "server_id" ? Number(value) : value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Abonimi"
        value={form.abonimi_id}
        name="abonimi_id"
        onChange={(v) => handleChange("abonimi_id", v)}
        options={[
          { value: "", label: "Zgjidh abonimin" },
          ...abonimiOptions.map((a) => ({
            value: a.id,
            label: `#${a.id} - Klienti ${a.klienti_id} - ${a.statusi}`,
          })),
        ]}
      />

      <Select
        label="Serveri"
        value={form.server_id}
        name="server_id"
        onChange={(v) => handleChange("server_id", v)}
        options={[
          { value: "", label: "Zgjidh serverin" },
          ...serverOptions.map((s) => ({
            value: s.id,
            label: `#${s.id} - ${s.emri} (${s.ip_adresa})`,
          })),
        ]}
      />

      <Input
        label="Username"
        value={form.username}
        name="username"
        onChange={(v) => handleChange("username", v)}
      />

      <Input
        label="Hapesira e Perdorur (GB)"
        type="number"
        value={form.hapesira_perdorur}
        name="hapesira_perdorur"
        onChange={(v) => handleChange("hapesira_perdorur", Number(v))}
      />

      <Input
        label="Bandwidth i Perdorur (GB)"
        type="number"
        value={form.bandwith_perdorur}
        name="bandwith_perdorur"
        onChange={(v) => handleChange("bandwith_perdorur", Number(v))}
      />

      <Input
        label="Data Krijimit"
        type="date"
        value={form.data_krijimit}
        name="data_krijimit"
        onChange={(v) => handleChange("data_krijimit", v)}
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

      <Input
        label="IP Dedikuar"
        value={form.ip_dedikuar || ""}
        name="ip_dedikuar"
        onChange={(v) => handleChange("ip_dedikuar", v)}
      />

      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Llogarine" : "Shto Llogari Hosting"}
      </button>
    </form>
  );
}

export default LlogariHostingsForm;
