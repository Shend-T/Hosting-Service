import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";
import Loader from "../../../components/Common/Loader";

import { getStatusBadgeKlienti } from "../../../utils/statusUtils";
import { KLIENTI_FORM } from "../constants/forms";
import { validateKlienti } from "../../../utils/validators";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import useAdminCrud from "../../../hooks/useAdminCrud";

import KlientiForm from "../components/Forms/KlientiForm";
import KlientiDisplay from "../components/Display/KlientiDisplay";

function AdminKlienti() {
  const {
    data: klientet,
    error,
    loading,
    getAll,
    getOne,
    create,
    update,
    remove,
  } = useAdminCrud("klienti");

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
    setKlienti(null);
    setKlientiForm(KLIENTI_FORM);
    setKlientiUpdateForm(null);
  };

  useEffect(() => {
    if (error !== null) {
      openModal("error");
    }
  }, [error]);

  useEffect(() => {
    getAll();
  }, []);

  const [klienti, setKlienti] = useState(null);
  const [klientiForm, setKlientiForm] = useState(KLIENTI_FORM);
  const createKlienti = async (e) => {
    e.preventDefault();
    if (!validateKlienti(klientiForm, false)) return;

    create(klientiForm);
    closeModal("create");
  };

  const [klientiUpdateForm, setKlientiUpdateForm] = useState(null);
  const updateKlienti = async (e) => {
    e.preventDefault();
    if (!validateKlienti(klientiUpdateForm, true)) return;

    update(klienti.id, klientiUpdateForm);
    closeModal("update");
  };

  const deleteKlienti = async () => {
    remove(klienti.id);
    closeModal("delete");
  };

  useEscapeKey(modals, () => {
    setModals({
      show: false,
      create: false,
      update: false,
      delete: false,
      error: false,
    });
    setKlienti(null);
    setKlientiForm(KLIENTI_FORM);
    setKlientiUpdateForm(null);
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <>
        <h1>Klientet</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            openModal("create");
          }}
        >
          Shto Klient
        </button>
      </>

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
                    openModal("show");
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
                        openModal("update");
                        setKlienti(klienti);
                        setKlientiUpdateForm(klienti);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        openModal("delete");
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

      {modals.show && (
        <Modal
          show={modals.show}
          onClose={() => closeModal("show")}
          title={`Klienti: #${klienti.id} - ${klienti.emri} ${klienti.mbiemri}`}
        >
          <div className="modal-body">
            <KlientiDisplay klienti={klienti} />
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
              onClick={() => closeModal("create")}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {modals.update && (
        <Modal
          show={modals.update}
          onClose={() => closeModal("update")}
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
              onClick={() => closeModal("update")}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {modals.delete && (
        <Modal
          show={modals.delete}
          onClose={() => closeModal("delete")}
          title={`Deshironi ta fshini klientin: #${klienti.id} - ${klienti.emri} ${klienti.mbiemri}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deleteKlienti()}>
              Po, Fshij
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => closeModal("delete")}
            >
              Jo, Mbyll
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

export default AdminKlienti;
