import React from "react";

function PergjigjetDisplay({ pergjigja }) {
  return (
    <>
      <div className="row">
        <div className="col-6 mb-3">
          <small className="text-muted">Tiketi ID</small>
          <p className="mb-0">{pergjigja.tiketi_id}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Autori</small>
          <p className="mb-0">{pergjigja.autori}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Lloji</small>
          <p className="mb-0">{pergjigja.lloji}</p>
        </div>
        <div className="col-6 mb-3">
          <small className="text-muted">Data Hapjes</small>
          <p className="mb-0">{pergjigja.data_hapjes?.slice(0, 10)}</p>
        </div>
        <div className="col-12 mb-3">
          <small className="text-muted">Mesazhi</small>
          <p className="mb-0">{pergjigja.mesazhi}</p>
        </div>
        <div className="col-12 mb-3">
          <small className="text-muted">Pergjigja</small>
          <p className="mb-0">{pergjigja.pergjigja}</p>
        </div>
      </div>
    </>
  );
}

export default PergjigjetDisplay;