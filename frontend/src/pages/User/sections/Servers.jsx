import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Servers() {
  const URL = "http://localhost:8000/api/llogari-hostings/user";
  const token = useSelector((state) => state.auth.token);

  const [hostingAccounts, setHostingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDomainForm, setShowDomainForm] = useState(false);

  useEffect(() => {
    const getHostingAccounts = async () => {
      try {
        const res = await axios.get(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHostingAccounts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setShowDomainForm(false);
      }
    };

    getHostingAccounts();
  }, [selectedAccount]);

  const getStatusBadge = (statusi) => {
    switch (statusi) {
      case "aktiv":
        return "badge bg-success";
      case "jo-aktiv":
        return "badge bg-secondary";
      default:
        return "badge bg-secondary";
    }
  };

  const [domainForm, setDomainForm] = useState({
    llogari_hostings_id: "",
    emri_domainit: "",
    tld: ".ubt",
    data_skadimit: "",
  });
  const createDomain = async (e) => {
    e.preventDefault();

    const updatedForm = {
      ...domainForm,
      llogari_hostings_id: selectedAccount.id,
      data_skadimit: selectedAccount.abonimi.data_skadimit,
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/domains/user",
        updatedForm,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSelectedAccount(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Kalkulo perqindjen e hapesires se perdorur
  const getStoragePercent = (used, total) => {
    if (!total) return 0;
    return Math.min(Math.round((used / total) * 100), 100);
  };

  return (
    <div className="container px-lg-5">
      <div className="p-4 p-lg-5 text-center">
        <h1>Serverat e Juaj</h1>
      </div>

      {loading ? (
        <p className="text-center text-muted">Duke ngarkuar...</p>
      ) : hostingAccounts.length === 0 ? (
        <p className="text-center text-muted">
          Nuk keni asnje llogari hostingu aktive. Aktivizoni nje abonim
          fillimisht.
        </p>
      ) : (
        <div className="row gx-lg-5 align-items-stretch justify-content-center">
          {hostingAccounts.map((account) => (
            <div className="col-md-4 col-sm-8 mb-3" key={account.id}>
              <div className="card shadow py-3 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">
                      {account.abonimi?.paketa?.emri}
                    </h5>
                    <span className={getStatusBadge(account.statusi)}>
                      {account.statusi}
                    </span>
                  </div>

                  <h6 className="fw-bold text-muted mb-2">Llogaria</h6>
                  <div className="mb-3">
                    <small className="text-muted">Username</small>
                    <p className="mb-1 font-monospace">{account.username}</p>

                    <small className="text-muted">Domain-i Kryesor</small>
                    <p className="mb-1 font-monospace">
                      {account.domains.length > 0
                        ? account.domains[0].emri_domainit +
                          account.domains[0].tld
                        : "Nuk ke domain momentalisht"}
                    </p>

                    <small className="text-muted">IP Adresa</small>
                    <p className="mb-1 font-monospace">{account.ip_dedikuar}</p>

                    <small className="text-muted">Bandwidth Perdorur</small>
                    <p className="mb-1">{account.bandwith_perdorur} GB</p>
                  </div>

                  <h6 className="fw-bold text-muted mb-2">Hapesira</h6>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small>{account.hapesira_perdorur} GB perdorur</small>
                      <small>
                        {account.abonimi?.paketa?.hapesira_gb} GB total
                      </small>
                    </div>
                    <div className="progress">
                      <div
                        className={`progress-bar ${
                          getStoragePercent(
                            account.hapesira_perdorur,
                            account.abonimi?.paketa?.hapesira_gb,
                          ) > 80
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                        style={{
                          width: `${getStoragePercent(
                            account.hapesira_perdorur,
                            account.abonimi?.paketa?.hapesira_gb,
                          )}%`,
                        }}
                      />
                    </div>
                    <small className="text-muted">
                      {getStoragePercent(
                        account.hapesira_perdorur,
                        account.abonimi?.paketa?.hapesira_gb,
                      )}
                      % perdorur
                    </small>
                  </div>

                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => setSelectedAccount(account)}
                  >
                    Shiko Detajet e Serverit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAccount && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedAccount(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Detajet e Serverit — {selectedAccount.server?.emri}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedAccount(null)}
                />
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-6 mb-3">
                    <small className="text-muted">Emri Serverit</small>
                    <p className="mb-0">{selectedAccount.server?.emri}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted">Lokacioni</small>
                    <p className="mb-0">{selectedAccount.server?.lokacioni}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted">Sistemi Operativ</small>
                    <p className="mb-0">
                      {selectedAccount.server?.sistemi_operativ}
                    </p>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted">Lloji</small>
                    <p className="mb-0">{selectedAccount.server?.lloji}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted">RAM</small>
                    <p className="mb-0">{selectedAccount.server?.ram_gb} GB</p>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted">CPU Cores</small>
                    <p className="mb-0">{selectedAccount.server?.cpu_core}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted">Hapesira Totale</small>
                    <p className="mb-0">
                      {selectedAccount.server?.hapesira_tb} TB
                    </p>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted">IP Serverit</small>
                    <p className="mb-0 font-monospace">
                      {selectedAccount.server?.ip_adresa}
                    </p>
                  </div>

                  <h5 className="fw-bold mb-3">
                    Domain-et (max:{" "}
                    {selectedAccount.abonimi.paketa.nr_domaineve})
                  </h5>
                  {selectedAccount.domains.length === 0 ? (
                    <div className="col-6 mb-3">
                      <p>Krijo domain-in tend</p>
                    </div>
                  ) : (
                    selectedAccount.domains.map((domain) => (
                      <div className="col-6 mb-3" key={domain.id}>
                        <small className="text-muted">
                          Domain-i {domain.id}
                        </small>
                        <p className="mb-0">{domain.emri_domainit}</p>
                      </div>
                    ))
                  )}

                  {selectedAccount.abonimi.paketa.nr_domaineve >
                    selectedAccount.domains.length && (
                    <div className="col-8">
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowDomainForm(!showDomainForm)}
                      >
                        Krijo Domain-in Tend
                      </button>
                    </div>
                  )}
                </div>

                {showDomainForm && (
                  <div className="row">
                    <form onSubmit={createDomain}>
                      <div className="form-floating mt-3 mb-3">
                        <input
                          type="text"
                          name="emri_domainit"
                          className="form-control"
                          id="emri_domainit"
                          placeholder="..."
                          value={domainForm.emri_domainit}
                          onChange={(e) =>
                            setDomainForm({
                              ...domainForm,
                              emri_domainit: e.target.value,
                            })
                          }
                          required
                        />
                        <label htmlFor="emri_domainit">Emri Domain-it</label>
                      </div>

                      <div className="mb-3">
                        {/* <input
                          type="text"
                          name="tld"
                          className="form-control"
                          id="tld"
                          placeholder="..."
                          value={domainForm.tld}
                          onChange={(e) =>
                            setDomainForm({
                              ...domainForm,
                              tld: e.target.value,
                            })
                          }
                          required
                        />
                        <label htmlFor="tld">Top Level Domain</label> */}

                        <label htmlFor="tld" className="form-label">
                          Top Level Domain
                        </label>
                        <select
                          name="tld"
                          className="form-control"
                          id="tld"
                          value={domainForm.tld}
                          onChange={(e) =>
                            setDomainForm({
                              ...domainForm,
                              tld: e.target.value,
                            })
                          }
                        >
                          <option value=".ubt">.ubt</option>
                          <option value=".net">.net</option>
                          <option value=".com">.com</option>
                        </select>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <input
                          type="submit"
                          className="btn btn-primary btn-lg"
                          value="Submit"
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedAccount(null)}
                >
                  Mbyll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Servers;
