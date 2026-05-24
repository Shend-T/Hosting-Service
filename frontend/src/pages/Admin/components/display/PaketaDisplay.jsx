import React from "react";

import { getStatusBadgePaketa } from "../../../../utils/statusUtils";

function PaketaDisplay({ paketa }) {
  return (
    <>
      <div className="row">
        <div className="col-12 mb-3">
          <small className="text-muted">Emri Paketes</small>
          <p className="mb-0">{paketa.emri}</p>
        </div>
        <div className="col-12 mb-3">
          <small className="text-muted">Pershkrimi Paketes</small>
          <p className="mb-0">{paketa.pershkrimi}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Hapesira (GB)</small>
          <p className="mb-0">{paketa.hapesira_gb}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Bandwidth (GB)</small>
          <p className="mb-0">{paketa.bandwidth_gb}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Numri Domain-ave</small>
          <p className="mb-0">{paketa.nr_domaineve}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Numri EMail-ave</small>
          <p className="mb-0">{paketa.nr_emaileve}</p>
        </div>

        <div className="col-6 mb-3">
          <small className="text-muted">Cmimi Mujor ne Euro</small>
          <p className="mb-0">{paketa.cmimi_mujor} €</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Cmimi Vjetor ne Euro</small>
          <p className="mb-0">{paketa.cmimi_vjetor} €</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Ka SSL</small>
          <p className="mb-0">{paketa.ssl === 1 ? "Po" : "Jo"}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Statusi Paketes</small>
          <p
            className={`${getStatusBadgePaketa(paketa.statusi)} mt-2 mb-0`}
            style={{ width: "fit-content", display: "block" }}
          >
            {paketa.statusi}
          </p>
        </div>
      </div>
    </>
  );
}

export default PaketaDisplay;
