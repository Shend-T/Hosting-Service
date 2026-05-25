import React from "react";

import { getStatusBadgeKlienti } from "../../../../utils/statusUtils";

function ServeretDisplay({ server }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-muted">Emri</small>
          <p className="mb-0">{server.emri}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">IP Adresa</small>
          <p className="mb-0">{server.ip_adresa}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Lloji</small>
          <p className="mb-0">{server.lloji}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Sistemi Operativ</small>
          <p className="mb-0">{server.sistemi_operativ}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">RAM (GB)</small>
          <p className="mb-0">{server.ram_gb}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">CPU Core</small>
          <p className="mb-0">{server.cpu_core}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Hapesira (TB)</small>
          <p className="mb-0">{server.hapesira_tb}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Lokacioni</small>
          <p className="mb-0">{server.lokacioni}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Statusi</small>
          <p
            className={`${getStatusBadgeKlienti(server.statusi)} mt-2 mb-0`}
            style={{ width: "fit-content", display: "block" }}
          >
            {server.statusi}
          </p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Instalimit</small>
          <p className="mb-0">{server.data_instalimit}</p>
        </div>
      </div>
    </>
  );
}

export default ServeretDisplay;
