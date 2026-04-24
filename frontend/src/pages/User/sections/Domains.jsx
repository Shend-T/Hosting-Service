import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Domains() {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.user.id);

  const [domains, setDomains] = useState([]);
  const [hostingAccounts, setHostingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [form, setForm] = useState({
    llogari_hostings_id: "",
    emri_domainit: "",
    tld: ".ubt",
    data_skadimit: "",
  });
  const [errors, setErrors] = useState({});

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [domainsRes, hostingRes] = await Promise.all([
          axios.get("http://localhost:8000/api/domains/user", { headers }),
          axios.get("http://localhost:8000/api/llogari-hostings/user", {
            headers,
          }),
        ]);
        setDomains(domainsRes.data);
        setHostingAccounts(hostingRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (statusi) => {
    switch (statusi) {
      case "aktiv":
        return "badge bg-success";
      case "jo-aktiv":
        return "badge bg-secondary";
      case "suspenduar":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.llogari_hostings_id)
      newErrors.llogari_hostings_id = "Zgjidhni nje llogari hostingu";
    if (!form.emri_domainit.trim())
      newErrors.emri_domainit = "Emri domainit eshte i detyrushem";
    if (!form.data_skadimit)
      newErrors.data_skadimit = "Data skadimit eshte e detyrueshme";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerDomain = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:8000/api/domains", form, {
        headers,
      });
      setDomains([...domains, res.data]);
      setShowRegisterModal(false);
      setForm({
        llogari_hostings_id: "",
        emri_domainit: "",
        tld: ".ubt",
        data_skadimit: "",
      });
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "Dicka shkoi gabim. Provoni perseri." });
      }
    }
  };

  const deleteDomain = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/domains/${id}`, {
        headers,
      });
      setDomains(domains.filter((d) => d.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-lg-5">
      <div className="p-4 p-lg-5 d-flex justify-content-between align-items-center">
        <h1>Domainat e Juaj</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowRegisterModal(true)}
        >
          Regjistro Domain
        </button>
      </div>

      {loading ? (
        <p className="text-center text-muted">Duke ngarkuar...</p>
      ) : domains.length === 0 ? (
        <p className="text-center text-muted">
          Nuk keni asnje domain te regjistruar.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Statusi</th>
                <th>Llogaria Hostingut</th>
                <th>Data Regjistrimit</th>
                <th>Data Skadimit</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain.id}>
                  <td className="font-monospace">
                    {domain.emri_domainit}
                    {domain.tld}
                  </td>
                  <td>
                    <span className={getStatusBadge(domain.statusi)}>
                      {domain.statusi}
                    </span>
                  </td>
                  <td className="font-monospace">
                    {domain.llogari_hostings?.ip_dedikuar ?? "N/A"}
                  </td>
                  <td>
                    {new Date(domain.data_regjistrimit).toLocaleDateString()}
                  </td>
                  <td>{new Date(domain.data_skadimit).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteDomain(domain.id)}
                    >
                      Fshij
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Register Domain Modal */}
      {showRegisterModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowRegisterModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Regjistro Domain</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowRegisterModal(false)}
                />
              </div>

              <div className="modal-body">
                {errors.general && (
                  <div className="alert alert-danger">{errors.general}</div>
                )}

                {/* Hosting account selector */}
                <div className="mb-3">
                  <label className="form-label">Llogaria Hostingut</label>
                  <select
                    name="llogari_hostings_id"
                    className={`form-select ${errors.llogari_hostings_id ? "is-invalid" : ""}`}
                    value={form.llogari_hostings_id}
                    onChange={handleChange}
                  >
                    <option value="">Zgjidhni nje llogari...</option>
                    {hostingAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.username} — {account.ip_dedikuar}
                      </option>
                    ))}
                  </select>
                  {errors.llogari_hostings_id && (
                    <div className="invalid-feedback">
                      {errors.llogari_hostings_id}
                    </div>
                  )}
                </div>

                {/* Domain name */}
                <div className="mb-3">
                  <label className="form-label">Emri Domainit</label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="emri_domainit"
                      className={`form-control ${errors.emri_domainit ? "is-invalid" : ""}`}
                      placeholder="mywebsite"
                      value={form.emri_domainit}
                      onChange={handleChange}
                    />
                    <select
                      name="tld"
                      className="form-select"
                      style={{ maxWidth: "120px" }}
                      value={form.tld}
                      onChange={handleChange}
                    >
                      <option value=".ubt">.ubt</option>
                      <option value=".com">.com</option>
                      <option value=".net">.net</option>
                      <option value=".org">.org</option>
                    </select>
                    {errors.emri_domainit && (
                      <div className="invalid-feedback">
                        {errors.emri_domainit}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expiry date */}
                <div className="mb-3">
                  <label className="form-label">Data Skadimit</label>
                  <input
                    type="date"
                    name="data_skadimit"
                    className={`form-control ${errors.data_skadimit ? "is-invalid" : ""}`}
                    value={form.data_skadimit}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.data_skadimit && (
                    <div className="invalid-feedback">
                      {errors.data_skadimit}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowRegisterModal(false)}
                >
                  Anulo
                </button>
                <button className="btn btn-primary" onClick={registerDomain}>
                  Regjistro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Domains;
