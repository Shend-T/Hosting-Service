import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Servers() {
  const URL = "http://localhost:8000/api/llogari-hostings/user";
  const token = useSelector((state) => state.auth.token);

  const [hostingAccounts, setHostingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const getHostingAccounts = async () => {
      try {
        const res = await axios.get(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHostingAccounts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getHostingAccounts();
  }, []);

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

  // Calculate storage usage percentage
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
                </div>
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
