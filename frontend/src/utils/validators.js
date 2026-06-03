const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const telefoniRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export const validateKlienti = (form, isEdit) => {
  let inputErrors = "";

  if (!form.emri?.trim()) inputErrors += " Emri eshte i detyrushem";
  if (!form.mbiemri?.trim()) inputErrors += " Mbiemri eshte i detyrushem";
  if (!form.kompania?.trim()) inputErrors += " Kompania eshte e detyrueshme";
  if (!form.email?.trim() || !emailRegex.test(form.email))
    inputErrors += " Email-i duhet te jete valid";
  if (!isEdit && form.password?.length < 8)
    inputErrors += " Password-i eshte i detyrushem";
  if (!form.telefoni?.trim() || !telefoniRegex.test(form.telefoni))
    inputErrors += " Numri telefonit duhet tja nis me + (p.sh. +38344123456)";
  if (!form.adresa?.trim()) inputErrors += " Adresa eshte e detyrueshme";
  if (form.bilanci < 0) inputErrors += " Bilanci nuk mund te jete negativ";

  if (inputErrors.length !== 0) alert(inputErrors);
  return inputErrors.length === 0;
};

export const validatePaketa = (form) => {
  let inputErrors = "";

  if (!form.emri?.trim()) inputErrors += " Emri eshte i detyrushem";
  if (!form.pershkrimi?.trim()) inputErrors += " Pershkrimi eshte i detyrushem";
  if (form.hapesira_gb <= 0) inputErrors += " hapesira_gb eshte i detyrushem";
  if (form.bandwidth_gb <= 0) inputErrors += " bandwidth_gb eshte i detyrushem";
  if (form.nr_domaineve <= 0) inputErrors += " nr_domaineve eshte i detyrushem";
  if (form.nr_emaileve <= 0) inputErrors += " nr_emaileve eshte i detyrushem";
  if (form.cmimi_mujor <= 0) inputErrors += " cmimi_mujor eshte i detyrushem";
  if (form.cmimi_vjetor <= 0) inputErrors += " cmimi_vjetor eshte i detyrushem";

  if (inputErrors.length !== 0) alert(inputErrors);
  return inputErrors.length === 0;
};
