import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";

function Plans() {
  const URL = "http://localhost:8000/api/abonimi/user";
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.user.id);

  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketSub, setTicketSub] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const getUserAbonimi = async () => {
      try {
        const res = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubscriptions(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserAbonimi();
  }, []);

  const updateSubInState = (updatedSub) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === updatedSub.id ? updatedSub : s)),
    );
    if (selectedSub?.id === updatedSub.id) setSelectedSub(updatedSub);
  };
  const handleToggleAutoRinovim = async (sub) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/abonimi/${sub.id}/toggle-auto-rinovim`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      updateSubInState({ ...sub, auto_rinovim: !sub.auto_rinovim });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (sub) => {
    if (sub.statusi === "suspenduar" || sub.statusi === "skaduar") {
      setStatusMessage("Nuk mund te anuloni nje abonim te suspenduar.");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:8000/api/abonimi/${sub.id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      updateSubInState({ ...sub, statusi: "ndalur" });
      setStatusMessage("Abonimimi u anulua me sukses.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivate = async (sub) => {
    if (sub.statusi === "suspenduar" || sub.statusi === "skaduar") {
      setStatusMessage("Nuk mund te aktivizoni nje abonim te suspenduar.");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:8000/api/abonimi/${sub.id}/activate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      updateSubInState({ ...sub, statusi: "aktiv" });
      setStatusMessage("Abonimimi u aktivizua me sukses.");
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadge = (statusi) => {
    switch (statusi) {
      case "aktiv":
        return "badge bg-success";
      case "pritje":
        return "badge bg-warning text-dark";
      case "ndalur":
        return "badge bg-secondary";
      case "suspenduar":
        return "badge bg-danger";
      case "skaduar":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container px-lg-5">
      <div className="p-4 p-lg-5 text-center">
        <h1>Abonimet e Juaja</h1>
        <Link to="/services" style={{ textDecoration: "none" }}>
          <button className="btn btn-outline-primary btn-sm">
            Krijo Abonim Te Rij
          </button>
        </Link>
        {statusMessage && (
          <div className="alert alert-info alert-dismissible">
            {statusMessage}
            <button
              className="btn-close"
              onClick={() => setStatusMessage("")}
            />
          </div>
        )}
      </div>

      <div className="container px-lg-5">
        <div className="row gx-lg-5 align-items-center justify-content-center">
          {subscriptions.map((sub) => (
            <div className="col-md-4 col-sm-8 mb-3" key={sub.id}>
              <div className="card shadow py-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{sub.paketa?.emri}</h5>
                    <span className={getStatusBadge(sub.statusi)}>
                      {sub.statusi}
                    </span>
                  </div>

                  <p className="card-text text-muted mb-1">
                    Cmimi: €{sub.cmimi} / {sub.periudha}
                  </p>
                  <p className="card-text text-muted mt-2 mb-1">
                    Blere ne: {new Date(sub.data_fillimit).toLocaleDateString()}
                  </p>
                  <p className="card-text text-muted mb-3">
                    Skadon: {new Date(sub.data_skadimit).toLocaleDateString()}
                  </p>

                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className="btn btn-primary btn-md"
                      onClick={() => {
                        setSelectedSub(sub);
                        setStatusMessage("");
                      }}
                    >
                      Shiko Me Shume
                    </button>
                    <button
                      className="btn btn-warning btn-md"
                      onClick={() => {
                        setTicketSub(sub);
                        setShowTicketModal(true);
                      }}
                    >
                      Hap Tiket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedSub && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setSelectedSub(null)}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content px-5">
                <div className="modal-header">
                  <h3 className="modal-title">
                    {selectedSub.paketa?.emri}{" "}
                    <span className={getStatusBadge(selectedSub.statusi)}>
                      {selectedSub.statusi}
                    </span>
                  </h3>
                  <button
                    className="btn-close"
                    onClick={() => setSelectedSub(null)}
                  />
                </div>

                <div className="modal-body">
                  {statusMessage && (
                    <div className="alert alert-info">{statusMessage}</div>
                  )}

                  {/* Specifikat e Paketes */}
                  <h5 className="fw-bold mb-3">Detajet e Paketes</h5>
                  <div className="row mb-4">
                    <div className="col-6 col-md-4 mb-2">
                      <small className="lead">Hapesira</small>
                      <p>{selectedSub.paketa?.hapesira_gb} GB</p>
                    </div>
                    <div className="col-6 col-md-4 mb-2">
                      <small className="lead">Bandwidth</small>
                      <p className="mb-0">
                        {selectedSub.paketa?.bandwidth_gb} GB
                      </p>
                    </div>
                    <div className="col-6 col-md-4 mb-2">
                      <small className="lead">Domaine</small>
                      <p className="mb-0">{selectedSub.paketa?.nr_domaineve}</p>
                    </div>
                    <div className="col-6 col-md-4 mb-2">
                      <small className="lead">Email</small>
                      <p className="mb-0">{selectedSub.paketa?.nr_emaileve}</p>
                    </div>
                    <div className="col-6 col-md-4 mb-2">
                      <small className="lead">SSL</small>
                      <p className="mb-0">
                        {selectedSub.paketa?.ssl ? "Po" : "Jo"}
                      </p>
                    </div>
                  </div>

                  {/* Detajet e abonimit */}
                  <h5 className="fw-bold mb-3">Detajet e Abonimit</h5>
                  <div className="row mb-4">
                    <div className="col-6 mb-2">
                      <small className="lead">Data Fillimit</small>
                      <p className="mb-0">
                        {new Date(
                          selectedSub.data_fillimit,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="lead">Data Skadimit</small>
                      <p className="mb-0">
                        {new Date(
                          selectedSub.data_skadimit,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="lead">Cmimi</small>
                      <p className="mb-0">
                        €{selectedSub.cmimi} / {selectedSub.periudha}
                      </p>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="lead">Auto Rinovim</small>
                      <p className="mb-0">
                        {selectedSub.auto_rinovim ? "Po" : "Jo"}
                      </p>
                    </div>
                  </div>

                  <h5 className="fw-bold mb-3">Veprimet</h5>
                  {/* Spo di naj term ma tmir */}
                  <div className="d-flex gap-2 flex-wrap">
                    {selectedSub.statusi === "pritje" && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleActivate(selectedSub)}
                      >
                        Aktivizo
                      </button>
                    )}

                    {selectedSub.statusi === "suspenduar" && (
                      <div className="alert alert-danger w-100 mb-0 py-2">
                        Ky abonim eshte i suspenduar. Kontaktoni supportin.
                      </div>
                    )}
                    {selectedSub.statusi === "skaduar" && (
                      <div className="alert alert-danger w-100 mb-0 py-2">
                        Ky abonim ka skaduar. Kontaktoni supportin.
                      </div>
                    )}

                    <button
                      className="btn btn-outline-primary btn-md"
                      onClick={() => handleToggleAutoRinovim(selectedSub)}
                    >
                      {selectedSub.auto_rinovim
                        ? "De-aktivizo Auto Rinovim"
                        : "Aktivizo Auto Rinovim"}
                    </button>

                    {(selectedSub.statusi === "aktiv" ||
                      selectedSub.statusi === "pritje") && (
                      <button
                        className="btn btn-danger btn-md"
                        onClick={() => handleCancel(selectedSub)}
                      >
                        Anulo Abonimin
                      </button>
                    )}

                    <button
                      className="btn btn-outline-warning btn-md"
                      onClick={() => {
                        setTicketSub(selectedSub);
                        setShowTicketModal(true);
                      }}
                    >
                      Hap Tiket
                    </button>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedSub(null)}
                  >
                    Mbyll
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showTicketModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowTicketModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Hap Tiket — Paketa {ticketSub?.paketa?.emri}
                  </h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowTicketModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <p className="text-muted">Ma von</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowTicketModal(false)}
                  >
                    Mbyll
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Plans;
