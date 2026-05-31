import React, { useState, useEffect } from "react";
import axios from "axios";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";
import Loader from "../../../components/Common/Loader";
import ProgressBar from "../components/ProgressBar";

import { MONITORIM_SERVERS_FORM } from "../constants/forms";

import { getStatusBadgeMonitori } from "../../../utils/statusUtils";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import useAdminCrud from "../../../hooks/useAdminCrud";

import MonitorimServersForm from "../components/Forms/MonitorimServersForm";
import MonitorimServersDisplay from "../components/Display/MonitorimServersDisplay";

function AdminMonitorimServers() {
  const {
    data: monitoret,
    error,
    loading,
    getAll,
    getOne,
    create,
    update,
    remove,
  } = useAdminCrud("monitorim-servers");

  const [modals, setModals] = useState({
    show: false,
    create: false,
    update: false,
    delete: false,
    error: false,
  });

  const openModal = (name) => setModals({ ...modals, [name]: true });
  const closeModal = (name) => {
    setModals({ ...modals, [name]: false });
    setMonitori(null);
    setMonitoriForm(MONITORIM_SERVERS_FORM);
    // setKlientiUpdateForm(null);
  };

  useEffect(() => {
    if (error !== null) {
      openModal("error");
    }
  }, [error]);

  useEffect(() => {
    getAll();
  }, []);

  const [monitori, setMonitori] = useState(null);
  const [monitoriForm, setMonitoriForm] = useState(MONITORIM_SERVERS_FORM);

  const createMonitori = async (e) => {
    e.preventDefault();
    console.log(monitoriForm);
  };

  useEscapeKey(modals, () => {
    setModals({
      show: false,
      create: false,
      update: false,
      delete: false,
      error: false,
    });
    setMonitori(null);
    setMonitoriForm(MONITORIM_SERVERS_FORM);
    // setKlientiUpdateForm(null);
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <>
        <h1>Monitoro Serveret</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            openModal("create");
          }}
        >
          Shto Monitorim Serveri
        </button>
      </>

      {monitoret && (
        <div className="table-responsive-md">
          <table className="table text-center align-middle fs-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"># Serveri</th>
                <th scope="col">CPU Perdorim %</th>
                <th scope="col">RAM Perdorim %</th>
                <th scope="col">Disk Perdorim %</th>
                <th scope="col">Bandwidth GB</th>
                <th scope="col">Statusi</th>
                <th scope="col">Alarmi</th>
                <th scope="col">Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {monitoret.map((monitori) => (
                <tr
                  key={monitori.id}
                  onClick={() => {
                    setMonitori(monitori);
                    openModal("show");
                  }}
                >
                  <td>{monitori.id}</td>
                  <td>{monitori.serveri_id}</td>
                  <td>
                    <ProgressBar
                      usedPercent={monitori.cpu_perdorim}
                      totalPercent={100}
                      text={monitori.cpu_perdorim}
                    />
                  </td>
                  <td>
                    <ProgressBar
                      usedPercent={monitori.ram_perdorim}
                      totalPercent={100}
                      text={monitori.ram_perdorim}
                    />
                  </td>
                  <td>
                    <ProgressBar
                      usedPercent={monitori.disk_perdorim}
                      totalPercent={70}
                      text={((monitori.disk_perdorim / 70) * 100).toFixed(2)}
                    />
                  </td>
                  <td>{monitori.bandwidth} GB</td>
                  <td>
                    <span
                      className={`${getStatusBadgeMonitori(monitori.statusi)}`}
                      style={{
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    >
                      {monitori.statusi}
                    </span>
                  </td>
                  <td>
                    {monitori.alarmi === 0
                      ? "🟢 Cdo gje ne rregull"
                      : "🔴 Nje Problem Ka Dal!"}
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        openModal("update");
                        // setKlienti(klienti);
                        // setKlientiUpdateForm(klienti);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        openModal("delete");
                        // setKlienti(klienti);
                      }}
                    >
                      Fshij
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modals.show && (
        <Modal
          show={modals.show}
          onClose={() => closeModal("show")}
          title={`Monitori: #${monitori.id}`}
        >
          <div className="modal-body">
            <MonitorimServersDisplay monitori={monitori} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => closeModal("show")}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {modals.create && (
        <Modal
          show={modals.create}
          onClose={() => closeModal("create")}
          title="Shto Monitorim Serveri"
        >
          <div className="modal-body">
            <MonitorimServersForm
              form={monitoriForm}
              setForm={setMonitoriForm}
              onSubmit={createMonitori}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => closeModal("create")}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {modals.error && (
        <ErrorModal
          show={modals.error}
          onClose={() => closeModal("error")}
          errorCode={error.response?.status}
          errorBody={error.response?.data}
          errorText={error.response?.statusText}
        />
      )}
    </div>
  );
}

export default AdminMonitorimServers;
