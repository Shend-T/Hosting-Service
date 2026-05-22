import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../components/common/Modal";

import { getStatusBadgeKlienti } from "../../../utils/statusUtils";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import KlientiForm from "../components/forms/KlientiForm";

const URL = "http://127.0.0.1:8000/api/admin/klienti";

function AdminKlienti() {
  const adminToken = useSelector((state) => state.admin.token);

  const HEADERS = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      Accept: "application/json",
    },
  };

  const [klientet, setKlientet] = useState([]);
  const getKlientet = async () => {
    try {
      const res = await axios.get(URL, HEADERS);

      setKlientet(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getKlientet();
  }, []);

  const [klientiForm, setKlientiForm] = useState({
    emri: "",
    mbiemri: "",
    kompania: "",
    email: "",
    password: "",
    telefoni: "",
    adresa: "",
    bilanci: 0,
    statusi: "aktiv",
  });
  const [showKlientiCreateModal, setShowKlientiCreateModal] = useState(false);

  const createKlienti = async (e) => {
    e.preventDefault();

    try {
      await axios.post(URL, klientiForm, HEADERS);

      getKlientet();
      setShowKlientiCreateModal(false);
    } catch (error) {
      console.log(error);
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
      setShowKlientiUpdateModal(false);
      setKlienti(null);
      setKlientiUpdateForm(null);
      getKlientet();
    } catch (error) {
      console.log(error);
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

      setShowKlientiDeleteModal(false);
      setKlienti(null);
      getKlientet();
    } catch (error) {
      console.log(error);
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
                <tr key={klienti.id}>
                  <th scope="row">{klienti.id}</th>
                  <td>{klienti.emri}</td>
                  <td>{klienti.mbiemri}</td>
                  <td>{klienti.kompania}</td>
                  <td>{klienti.email}</td>
                  <td>{klienti.telefoni}</td>
                  <td>{klienti.adresa}</td>
                  <td>{klienti.bilanci}</td>
                  <td
                    className={getStatusBadgeKlienti(klienti.statusi)}
                    style={{
                      padding: "5px",
                      fontSize: "8px",
                      marginTop: "5px",
                    }}
                  >
                    {klienti.statusi}
                  </td>
                  <td>{klienti.data_regjistrimit}</td>
                  <td>
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
    </div>
  );
}

export default AdminKlienti;
