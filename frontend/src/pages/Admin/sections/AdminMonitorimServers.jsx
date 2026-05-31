import React, { useState, useEffect } from "react";
import axios from "axios";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";
import Loader from "../../../components/Common/Loader";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import useAdminCrud from "../../../hooks/useAdminCrud";

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
    // setKlienti(null);
    // setKlientiForm(KLIENTI_FORM);
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
            // openModal("create");
          }}
        >
          Shto Monitorim Serveri
        </button>
      </>

      {monitoret && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Serveri</th>
                <th scope="col">CPU Perdorim %</th>
                <th scope="col">RAM Perdorim %</th>
                <th scope="col">Disk Perdorim GB</th>
                <th scope="col">Bandwidth GB</th>
                <th scope="col">Statusi</th>
                <th scope="col">Alarmi</th>
              </tr>
            </thead>
            <tbody>
              {monitoret.map((monitori) => (
                <tr
                  key={monitori.id}
                  onClick={() => {
                    // setKlienti(monitori);
                    // openModal("show");
                  }}
                >
                  <td>{monitori.id}</td>
                  <td>{monitori.server_id}</td>
                  <td>{monitori.cpu_perdorim}</td>
                  <td>{monitori.ram_perdorim}</td>
                  <td>{monitori.disk_perdorim}</td>
                  <td>{monitori.statusi}</td>
                  <td>{monitori.alarmi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminMonitorimServers;
