export const KLIENTI_FORM = {
  emri: "",
  mbiemri: "",
  kompania: "",
  email: "",
  password: "",
  telefoni: "",
  adresa: "",
  bilanci: 0,
  statusi: "aktiv",
};

export const PAKETA_FORM = {
  emri: "",
  pershkrimi: "",
  hapesira_gb: 0,
  bandwidth_gb: 0,
  nr_domaineve: 0,
  nr_emaileve: 0,
  ssl: false,
  cmimi_mujor: 0,
  cmimi_vjetor: 0,
  statusi: "aktiv",
};

export const ABONIMI_FORM = {
  klienti_id: 0,
  paketa_id: 0,
  data_fillimit: new Date().toISOString().split("T")[0],
  data_skadimit: new Date().toISOString().split("T")[0],
  statusi: "aktiv",
  cmimi: 0,
  periudha: "mujore",
  auto_rinovim: false,
};

export const MONITORIM_SERVERS_FORM = {
  serveri_id: 0,
  statusi: "nuk monitoron",
};
