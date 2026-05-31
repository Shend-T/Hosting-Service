import React, { useMemo } from "react";

import Input from "./Common/Input";
import Select from "./Common/Select";

function MonitorimServersForm({
  form,
  setForm,
  onSubmit,
  //   serveret,
  isEdit = false,
}) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  //   const serveretList = useMemo(
  //     () =>
  //       serveret.map((serveri) => ({
  //         value: serveri.id,
  //         label: `Serveri #${serveri.id} - ${serveri.emri} IP: ${serveri.ip_adresa}`,
  //       })),
  //     [serveret],
  //   );

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Statusi"
        value={form.statusi}
        name="statusi"
        onChange={(v) => handleChange("statusi", v)}
        options={[
          { value: "monitoron", label: "Monitoron" },
          { value: "nuk monitoron", label: "Nuk Monitoron" },
        ]}
      />
      {/* <Select
        label="Serveri"
        value={form.serveri_id}
        name="serveri_id"
        onChange={(v) => handleChange("serveri_id", Number(v))}
        options={serveretList}
      /> */}

      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Monitor" : "Shto Monitor"}
      </button>
    </form>
  );
}

export default MonitorimServersForm;
