import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";

import { getStatusBadgeKlienti } from "../../../utils/statusUtils";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import KlientiForm from "../components/Forms/KlientiForm";
import KlientiDisplay from "../components/Display/KlientiDisplay";

const URL = "http://127.0.0.1:8000/api/admin/klienti";

const FORM = {
  emri: "",
  mbiemri: "",
  kompania: "",
  email: "",
  password: "",
  telefoni: "",
  adresa: "",
  bilanci: 0,
  statusi: "aktiv",
};

function AdminKlienti() {
  const adminToken = useSelector((state) => state.admin.token);

  const HEADERS = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      Accept: "application/json",
    },
  };

  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  useEscapeKey(showErrorModal, () => {
    setShowErrorModal(false);
    setError(null);
  });

  const [klientet, setKlientet] = useState([]);
  const getKlientet = async () => {
    try {
      const res = await axios.get(URL, HEADERS);

      setKlientet(res.data);
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    }
  };
  useEffect(() => {
    getKlientet();
  }, []);

  const [showKlientiModal, setShowKlientiModal] = useState(false);
  useEscapeKey(showKlientiModal, () => {
    setShowKlientiModal(false);
  });

  const [klientiForm, setKlientiForm] = useState(FORM);
  const [showKlientiCreateModal, setShowKlientiCreateModal] = useState(false);
  const createKlienti = async (e) => {
    e.preventDefault();

    try {
      await axios.post(URL, klientiForm, HEADERS);

      getKlientet();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowKlientiCreateModal(false);
      setKlientiForm(FORM);
    }
  };
  useEscapeKey(showKlientiCreateModal, () => {
    setShowKlientiCreateModal(false);
  });

  const [klienti, setKlienti] = useState(null);
  const [klientiUpdateForm, setKlientiUpdateForm] = useState(null);
  const [showKlientiUpdateModal, setShowKlientiUpdateModal] = useState(false);

  const updateKlienti = async (e) => {
    e.preventDefault();

    try {
      await axios.put(URL + "/" + klienti.id, klientiUpdateForm, HEADERS);

      getKlientet();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowKlientiUpdateModal(false);
      setKlienti(null);
      setKlientiUpdateForm(null);
    }
  };
  useEscapeKey(showKlientiUpdateModal, () => {
    setShowKlientiUpdateModal(false);
    setKlienti(null);
    setKlientiUpdateForm(null);
  });

  const [showKlientiDeleteModal, setShowKlientiDeleteModal] = useState(false);
  const deleteKlienti = async () => {
    try {
      await axios.delete(URL + "/" + klienti.id, HEADERS);

      getKlientet();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowKlientiDeleteModal(false);
      setKlienti(null);
    }
  };
  useEscapeKey(showKlientiDeleteModal, () => {
    setShowKlientiDeleteModal(false);
    setKlienti(null);
  });

  return (
    <div>
      <h1>Klientet</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowKlientiCreateModal(true)}
      >
        Shto Klient
      </button>

      {klientet && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Emri</th>
                <th scope="col">Mbiemri</th>
                <th scope="col">Kompania</th>
                <th scope="col">Email</th>
                <th scope="col">Telefoni</th>
                <th scope="col">Adresa</th>
                <th scope="col">Bilanci</th>
                <th scope="col">Statusi</th>
                <th scope="col">Data Regjistrimit</th>
                <th scope="col">Aksionet</th>
                {/* Spo di term ma tmir se aksionet */}
              </tr>
            </thead>
            <tbody>
              {klientet.map((klienti) => (
                <tr
                  key={klienti.id}
                  onClick={() => {
                    setKlienti(klienti);
                    setShowKlientiModal(true);
                  }}
                >
                  <td>{klienti.id}</td>
                  <td>{klienti.emri}</td>
                  <td>{klienti.mbiemri}</td>
                  <td>{klienti.kompania}</td>
                  <td>{klienti.email}</td>
                  <td>{klienti.telefoni}</td>
                  <td>{klienti.adresa}</td>
                  <td>{klienti.bilanci}</td>
                  <td>
                    <span
                      className={`${getStatusBadgeKlienti(klienti.statusi)}`}
                      style={{
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    >
                      {klienti.statusi}
                    </span>
                  </td>
                  <td>{klienti.data_regjistrimit}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        setShowKlientiUpdateModal(true);
                        setKlienti(klienti);
                        setKlientiUpdateForm(klienti);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setShowKlientiDeleteModal(true);
                        setKlienti(klienti);
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

      {showKlientiModal && (
        <Modal
          show={showKlientiModal}
          onClose={() => setShowKlientiModal(false)}
          title={`Klienti: #${klienti.id} - ${klienti.emri} ${klienti.mbiemri}`}
        >
          <div className="modal-body">
            <KlientiDisplay klienti={klienti} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowKlientiModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showKlientiCreateModal && (
        <Modal
          show={showKlientiCreateModal}
          onClose={() => setShowKlientiCreateModal(false)}
          title="Shto Klient"
        >
          <div className="modal-body">
            <KlientiForm
              form={klientiForm}
              setForm={setKlientiForm}
              onSubmit={createKlienti}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowKlientiCreateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showKlientiUpdateModal && (
        <Modal
          show={showKlientiUpdateModal}
          onClose={() => setShowKlientiUpdateModal(false)}
          title={`Perditso Klientin: #${klienti.id} - ${klienti.emri} ${klienti.mbiemri}`}
        >
          <div className="modal-body">
            <KlientiForm
              form={klientiUpdateForm}
              setForm={setKlientiUpdateForm}
              onSubmit={updateKlienti}
              isEdit={true}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowKlientiUpdateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showKlientiDeleteModal && (
        <Modal
          show={showKlientiDeleteModal}
          onClose={() => setShowKlientiDeleteModal(false)}
          title={`Deshironi ta fshini klientin: #${klienti.id} - ${klienti.emri} ${klienti.mbiemri}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deleteKlienti()}>
              Po, Fshij
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowKlientiDeleteModal(false)}
            >
              Jo, Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showErrorModal && (
        <ErrorModal
          show={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          errorCode={error.response?.status}
          errorBody={error.response?.data}
          errorText={error.response?.statusText}
        />
      )}
    </div>
  );
}

export default AdminKlienti;
