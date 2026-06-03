import React from "react";

function FakturaDisplay({ faktura }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-muted">Faktura ID</small>
          <p className="mb-0">#INV-{String(faktura.id).padStart(4, "0")}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Klienti ID</small>
          <p className="mb-0">{faktura.klienti_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Abonimi ID</small>
          <p className="mb-0">#AB-{String(faktura.abonimi_id).padStart(5, "0")}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Shuma</small>
          <p className="mb-0">€{Number(faktura.shuma).toFixed(2)}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">TVSH (18%)</small>
          <p className="mb-0">€{(Number(faktura.shuma) * 0.18).toFixed(2)}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Totali</small>
          <p className="mb-0">€{(Number(faktura.shuma) * 1.18).toFixed(2)}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Statusi</small>
          <p className="mb-0">{faktura.statusi}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Leshimit</small>
          <p className="mb-0">{faktura.data_leshimit?.slice(0, 10)}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Skadimit</small>
          <p className="mb-0">{faktura.data_skadimit?.slice(0, 10) || "—"}</p>
        </div>
        <div className="col-12 mb-3">
          <small className="text-muted">Pershkrimi</small>
          <p className="mb-0">{faktura.pershkrimi || "—"}</p>
        </div>
      </div>
    </>
  );
}

export default FakturaDisplay;