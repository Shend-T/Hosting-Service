import React from "react";

function TiketaDisplay({ tiketi }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-muted">Titulli</small>
          <p className="mb-0">{tiketi.titulli}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Kategoria</small>
          <p className="mb-0">{tiketi.kategoria}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Prioriteti</small>
          <p className="mb-0">{tiketi.prioriteti}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Statusi</small>
          <p className="mb-0">{tiketi.statusi}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Klienti ID</small>
          <p className="mb-0">{tiketi.klienti_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Hapjes</small>
          <p className="mb-0">{tiketi.data_hapjes?.slice(0, 10)}</p>
        </div>
        <div className="col-12 mb-3">
          <small className="text-muted">Pershkrimi</small>
          <p className="mb-0">{tiketi.pershkrimi}</p>
        </div>
      </div>
    </>
  );
}

export default TiketaDisplay;