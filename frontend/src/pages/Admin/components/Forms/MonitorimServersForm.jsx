import React, { useEffect, useMemo } from "react";

import Input from "./Common/Input";
import Select from "./Common/Select";

function MonitorimServersForm({
  form,
  setForm,
  onSubmit,
  serveret,
  isEdit = false,
}) {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const serveretList = useMemo(
    () =>
      serveret.map((serveri) => ({
        value: serveri.id,
        label: `Serveri #${serveri.id} - ${serveri.emri} IP: ${serveri.ip_adresa}`,
      })),
    [serveret],
  );

  function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  useEffect(() => {
    setForm({
      ...form,
      cpu_perdorim: getRandomFloat(10, 95),
      ram_perdorim: getRandomFloat(20, 90),
      disk_perdorim: getRandomFloat(5, 70),
      bandwidth: getRandomFloat(100, 1000),
    });
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Serveri"
        value={form.serveri_id}
        name="serveri_id"
        onChange={(v) => handleChange("serveri_id", Number(v))}
        options={[
          {
            value: 0,
            label: "Zgjidh serverin",
          },
          ...serveretList,
        ]}
      />

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

      <button className="btn btn-primary" type="submit">
        {isEdit ? "Perditso Monitor" : "Shto Monitor"}
      </button>
    </form>
  );
}

export default MonitorimServersForm;
