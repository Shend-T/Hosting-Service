import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";
import Loader from "../../../components/Common/Loader";

import { PAKETA_FORM } from "../constants/forms";

import { validatePaketa } from "../../../utils/validators";
import { getStatusBadgePaketa } from "../../../utils/statusUtils";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import useAdminCrud from "../../../hooks/useAdminCrud";

import PaketaForm from "../components/Forms/PaketaForm";
import PaketaDisplay from "../components/Display/PaketaDisplay";

function AdminPaketa() {
  const {
    data: paketat,
    error,
    loading,
    getAll,
    getOne,
    create,
    update,
    remove,
  } = useAdminCrud("paketa");

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
    setPaketa(null);
    setPaketaForm(PAKETA_FORM);
  };

  useEffect(() => {
    if (error !== null) {
      openModal("error");
    }
  }, [error]);

  useEffect(() => {
    getAll();
  }, []);

  const [paketa, setPaketa] = useState(null);
  const [paketaForm, setPaketaForm] = useState(PAKETA_FORM);
  const createPaketa = async (e) => {
    e.preventDefault();
    if (!validatePaketa(paketaForm)) return;

    create(paketaForm);
    closeModal("create");
  };

  const updatePaketa = async (e) => {
    e.preventDefault();
    if (!validatePaketa(paketaForm)) return;

    update(paketa.id, paketaForm);
    closeModal("update");
  };

  const deletePaketa = async () => {
    remove(paketa.id);
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
    setPaketa(null);
    setPaketaForm(PAKETA_FORM);
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <>
        <h1>Paketat</h1>
        <button className="btn btn-primary" onClick={() => openModal("create")}>
          Shto Pakete
        </button>
      </>

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
                    openModal("show");
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
                        openModal("update");
                        setPaketa(paketa);
                        setPaketaForm(paketa);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        openModal("delete");
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

      {modals.show && (
        <Modal
          show={modals.show}
          onClose={() => closeModal("show")}
          title={`Paketa #${paketa.id}`}
        >
          <div className="modal-body">
            <PaketaDisplay paketa={paketa} />
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
          title={`Deshironi ta fshini paketen: #${paketa.id}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deletePaketa()}>
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

export default AdminPaketa;
