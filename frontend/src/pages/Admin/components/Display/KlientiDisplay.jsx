import React from "react";

import { getStatusBadgeKlienti } from "../../../../utils/statusUtils";

function KlientiDisplay({ klienti }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-muted">Emri Klientit</small>
          <p className="mb-0">{klienti.emri}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Mbiemri Klientit</small>
          <p className="mb-0">{klienti.mbiemri}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Kompania Klientit</small>
          <p className="mb-0">{klienti.kompania}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">E-Mail Klientit</small>
          <p className="mb-0">{klienti.email}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Telefoni Klientit</small>
          <p className="mb-0">{klienti.telefoni}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Adresa Klientit</small>
          <p className="mb-0">{klienti.adresa}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Bilanci Klientit</small>
          <p className="mb-0">{klienti.bilanci}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Statusi Klientit</small>
          <p
            className={`${getStatusBadgeKlienti(klienti.statusi)} mt-2 mb-0`}
            style={{ width: "fit-content", display: "block" }}
          >
            {klienti.statusi}
          </p>
        </div>
      </div>
    </>
  );
}

export default KlientiDisplay;
