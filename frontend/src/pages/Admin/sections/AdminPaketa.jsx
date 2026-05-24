import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../components/common/Modal";

import { getStatusBadgePaketa } from "../../../utils/statusUtils";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import PaketaForm from "../components/forms/PaketaForm";
import PaketaDisplay from "../components/display/PaketaDisplay";

const URL = "http://127.0.0.1:8000/api/admin/paketa";

const FORM = {
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
};
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

  const [showPaketaModal, setShowPaketaModal] = useState(false);
  useEscapeKey(showPaketaModal, () => {
    setShowPaketaModal(false);
  });

  const [showPaketaCreateModal, setShowPaketaCreateModal] = useState(false);
  const [paketaForm, setPaketaForm] = useState(FORM);
  const createPaketa = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URL, paketaForm, HEADERS);

      setShowPaketaCreateModal(false);
      setPaketaForm(FORM);
      getPaketat();
    } catch (error) {
      console.log(error);
    }
  };
  useEscapeKey(showPaketaCreateModal, () => {
    setShowPaketaCreateModal(false);
  });

  const [paketa, setPaketa] = useState(null);
  const [showPaketaUpdateModal, setShowPaketaUpdateModal] = useState(false);
  const updatePaketa = async (e) => {
    e.preventDefault();
    try {
      await axios.put(URL + "/" + paketa.id, paketaForm, HEADERS);

      getPaketat();
      setShowPaketaUpdateModal(false);
      setPaketaForm(FORM);
    } catch (error) {
      console.log(error);

      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      const statusText = error.response?.statusText;

      console.log("Status Kodi:", statusCode);
      console.log("Response Body:", responseBody);
      console.log("Status Teksti:", statusText);
    }
  };

  const [showPaketaDeleteModal, setShowPaketaDeleteModal] = useState(false);
  const deletePaketa = async () => {
    try {
      await axios.delete(URL + "/" + paketa.id, HEADERS);

      setShowPaketaDeleteModal(false);
      setPaketa(null);
      getPaketat();
    } catch (error) {
      console.log(error);
    }
  };
  useEscapeKey(showPaketaDeleteModal, () => {
    setShowPaketaDeleteModal(false);
    setPaketa(null);
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
                <tr
                  key={paketa.id}
                  onClick={() => {
                    setPaketa(paketa);
                    setShowPaketaModal(true);
                  }}
                >
                  <td>{paketa.id}</td>
                  <td>{paketa.emri}</td>
                  <td>{paketa.pershkrimi.substring(0, 20) + "..."}</td>
                  <td>{paketa.hapesira_gb}</td>
                  <td>{paketa.bandwidth_gb}</td>
                  <td>{paketa.nr_domaineve}</td>
                  <td>{paketa.nr_emaileve}</td>
                  <td>{paketa.ssl === 1 ? "Po" : "Jo"}</td>
                  <td>{paketa.cmimi_mujor}</td>
                  <td>{paketa.cmimi_vjetor}</td>
                  <td>
                    <span
                      className={`${getStatusBadgePaketa(paketa.statusi)}`}
                      style={{
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    >
                      {paketa.statusi}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        setShowPaketaUpdateModal(true);
                        setPaketa(paketa);
                        setPaketaForm(paketa);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setShowPaketaDeleteModal(true);
                        setPaketa(paketa);
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

      {showPaketaModal && (
        <Modal
          show={showPaketaModal}
          onClose={() => setShowPaketaModal(false)}
          title={`Paketa #${paketa.id}`}
        >
          <div className="modal-body">
            <PaketaDisplay paketa={paketa} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowPaketaModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
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

      {showPaketaUpdateModal && (
        <Modal
          show={showPaketaUpdateModal}
          onClose={() => setShowPaketaUpdateModal(false)}
          title={`Perditso Paketen #${paketa.id}`}
        >
          <div className="modal-body">
            <PaketaForm
              form={paketaForm}
              setForm={setPaketaForm}
              onSubmit={updatePaketa}
              isEdit={true}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowPaketaUpdateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showPaketaDeleteModal && (
        <Modal
          show={showPaketaDeleteModal}
          onClose={() => setShowPaketaDeleteModal(false)}
          title={`Deshironi ta fshini paketen: #${paketa.id}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deletePaketa()}>
              Po, Fshij
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowPaketaDeleteModal(false)}
            >
              Jo, Mbyll
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AdminPaketa;
