import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../components/common/Modal";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import PaketaForm from "../components/forms/PaketaForm";

const URL = "http://127.0.0.1:8000/api/admin/paketa";
function AdminPaketa() {
  const adminToken = useSelector((state) => state.admin.token);

  const HEADERS = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      Accept: "application/json",
    },
  };

  const [paketat, setPaketat] = useState([]);
  const getPaketat = async () => {
    try {
      const res = await axios.get(URL, HEADERS);

      setPaketat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPaketat();
  }, []);

  const [showPaketaCreateModal, setShowPaketaCreateModal] = useState(false);
  const [paketaForm, setPaketaForm] = useState({
    emri: "",
    pershkrimi: "",
    hapesira_gb: 0,
    bandwidth_gb: 0,
    nr_domaineve: 0,
    nr_emaileve: 0,
    ssl: false,
    cmimi_mujor: 0,
    cmimi_vjetor: 0,
    statusi: "aktiv",
  });
  const createPaketa = async (e) => {
    e.preventDefault();
    // setPaketaForm({ ...paketaForm, ssl: ssl === "1" });
    console.log(paketaForm);
  };
  useEscapeKey(showPaketaCreateModal, () => {
    setShowPaketaCreateModal(false);
  });

  return (
    <div>
      <h1>Paketat</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowPaketaCreateModal(true)}
      >
        Shto Pakete
      </button>

      {paketat && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Emri</th>
                <th scope="col">Pershkrimi</th>
                <th scope="col">Hapesira (GB)</th>
                <th scope="col">Bandwidth (GB)</th>
                <th scope="col">Nr. Domaineve</th>
                <th scope="col">Nr. Emaileve</th>
                <th scope="col">SSL</th>
                <th scope="col">Cmimi Mujor €</th>
                <th scope="col">Cmimi Vjetor €</th>
                <th scope="col">Statusi</th>
                <th scope="col">Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {paketat.map((paketa) => (
                <tr key={paketa.id}>
                  <td>{paketa.id}</td>
                  <td>{paketa.emri}</td>
                  <td>{paketa.pershkrimi.substring(0, 20) + "..."}</td>
                  <td>{paketa.hapesira_gb}</td>
                  <td>{paketa.bandwidth_gb}</td>
                  <td>{paketa.nr_domaineve}</td>
                  <td>{paketa.nr_emaileve}</td>
                  <td>{paketa.ssl}</td>
                  <td>{paketa.cmimi_mujor}</td>
                  <td>{paketa.cmimi_vjetor}</td>
                  <td>{paketa.statusi}</td>
                  <td>
                    <button
                      className="table-btn btn btn-warning m-2"
                      //   onClick={() => {
                      //     setShowKlientiUpdateModal(true);
                      //     setKlienti(klienti);
                      //     setKlientiUpdateForm(klienti);
                      //   }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      //   onClick={() => {
                      //     setShowKlientiDeleteModal(true);
                      //     setKlienti(klienti);
                      //   }}
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

      {showPaketaCreateModal && (
        <Modal
          show={showPaketaCreateModal}
          onClose={() => setShowPaketaCreateModal(false)}
          title="Krijo Pakete"
        >
          <div className="modal-body">
            <PaketaForm
              form={paketaForm}
              setForm={setPaketaForm}
              onSubmit={createPaketa}
            />
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowPaketaCreateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AdminPaketa;
