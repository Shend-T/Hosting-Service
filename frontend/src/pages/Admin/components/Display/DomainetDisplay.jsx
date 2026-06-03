import React from "react";

import { getStatusBadgeKlienti } from "../../../../utils/statusUtils";

function DomainetDisplay({ domain }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-muted">Klienti ID</small>
          <p className="mb-0">{domain.klienti_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Llogaria Hosting ID</small>
          <p className="mb-0">{domain.llogari_hostings_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Emri i Domainit</small>
          <p className="mb-0">
            {domain.emri_domainit}
            {domain.tld}
          </p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Nameserverat</small>
          <p className="mb-0">{domain.nameserverat}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Statusi</small>
          <p
            className={`${getStatusBadgeKlienti(domain.statusi)} mt-2 mb-0`}
            style={{ width: "fit-content", display: "block" }}
          >
            {domain.statusi}
          </p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Regjistrimit</small>
          <p className="mb-0">{domain.data_regjistrimit}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Skadimit</small>
          <p className="mb-0">{domain.data_skadimit}</p>
        </div>
      </div>
    </>
  );
}

export default DomainetDisplay;
