import React from "react";

import ProgressBar from "../ProgressBar";
import { getStatusBadgeMonitori } from "../../../../utils/statusUtils";

function MonitorimServersDisplay({ monitori }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-mutes"># Serveri</small>
          <p className="mb-0">{monitori.serveri_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-mutes">CPU Perdorim %</small>
          <p className="mb-0">
            <ProgressBar
              usedPercent={monitori.cpu_perdorim}
              totalPercent={100}
              text={monitori.cpu_perdorim}
            />
          </p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-mutes">RAM Perdorim %</small>
          <p className="mb-0">
            <ProgressBar
              usedPercent={monitori.ram_perdorim}
              totalPercent={100}
              text={monitori.ram_perdorim}
            />
          </p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-mutes">Disk Perdorim % </small>
          <p className="mb-0">
            <ProgressBar
              usedPercent={monitori.disk_perdorim}
              totalPercent={70}
              text={((monitori.disk_perdorim / 70) * 100).toFixed(2)}
            />
          </p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-mutes">Bandwidth GB</small>
          <p className="mb-0">{monitori.bandwidth}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-mutes">Statusi</small>
          <p
            className={`mb-0 ${getStatusBadgeMonitori(monitori.statusi)}`}
            style={{
              padding: "5px",
              marginTop: "5px",
              width: "fit-content",
              display: "block",
            }}
          >
            {monitori.statusi}
          </p>
        </div>
        <div className="col-12 mb-3 text-center mt-3">
          <small className="text-mutes">Alarmi</small>
          <p className="mb-0">
            {monitori.alarmi === 0
              ? "🟢 Cdo gje ne rregull"
              : "🔴 Nje Problem Ka Dal!"}
          </p>
        </div>
      </div>
    </>
  );
}

export default MonitorimServersDisplay;
