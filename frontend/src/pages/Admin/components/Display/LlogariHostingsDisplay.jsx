import React from "react";

import { getStatusBadgePaketa } from "../../../../utils/statusUtils";

function LlogariHostingsDisplay({ llogariHosting }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-muted"># Abonimi</small>
          <p className="mb-0">{llogariHosting.abonimi_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted"># Serveri</small>
          <p className="mb-0">{llogariHosting.server_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Username</small>
          <p className="mb-0">{llogariHosting.username}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Hapesira e Perdorur</small>
          <p className="mb-0">{llogariHosting.hapesira_perdorur}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Bandwidth i Perdorur</small>
          <p className="mb-0">{llogariHosting.bandwith_perdorur}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Krijimit</small>
          <p className="mb-0">{llogariHosting.data_krijimit}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Statusi</small>
          <p
            className={`${getStatusBadgePaketa(llogariHosting.statusi)} mt-2 mb-0`}
            style={{ width: "fit-content", display: "block" }}
          >
            {llogariHosting.statusi}
          </p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">IP Dedikuar</small>
          <p className="mb-0">{llogariHosting.ip_dedikuar}</p>
        </div>
      </div>
    </>
  );
}

export default LlogariHostingsDisplay;
