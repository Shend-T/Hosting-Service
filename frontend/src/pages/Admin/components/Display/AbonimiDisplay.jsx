import React from "react";

import { getStatusBadgeAbonimi } from "../../../../utils/statusUtils";

function AbonimiDisplay({ abonimi }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-muted">Klienti #</small>
          <p className="mb-0">{abonimi.klienti_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Paketa #</small>
          <p className="mb-0">{abonimi.paketa_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Fillimit</small>
          <p className="mb-0">{abonimi.data_fillimit}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Skadimit</small>
          <p className="mb-0">{abonimi.data_skadimit}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Statusi Abonimit</small>
          <p
            className={`${getStatusBadgeAbonimi(abonimi.statusi)} mt-2 mb-0`}
            style={{ width: "fit-content", display: "block" }}
          >
            {abonimi.statusi}
          </p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Cmimi ne Euro</small>
          <p className="mb-0">{abonimi.cmimi} €</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Periudha</small>
          <p className="mb-0">{abonimi.periudha}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Auto Rinovim?</small>
          <p className="mb-0">{abonimi.auto_rinovim === 1 ? "Po" : "Jo"}</p>
        </div>
      </div>
    </>
  );
}

export default AbonimiDisplay;
