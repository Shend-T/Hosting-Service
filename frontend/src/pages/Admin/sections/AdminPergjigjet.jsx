import React, { useState, useEffect } from "react";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";
import Loader from "../../../components/Common/Loader";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import useAdminCrud from "../../../hooks/useAdminCrud";

import PergjigjetForm from "../components/Forms/PergjigjetForm";
import PergjigjetDisplay from "../components/Display/PergjigjetDisplay";

const FORM = {
  tiketi_id: 0,
  autori: "",
  mesazhi: "",
  pergjigja: "",
  lloji: "klient",
};

function AdminPergjigjet() {
  const {
    data: pergjigjet,
    error,
    loading,
    getAll,
    create,
    remove,
  } = useAdminCrud("pergjigjet");

  const [showErrorModal, setShowErrorModal] = useState(false);
  useEscapeKey(showErrorModal, () => setShowErrorModal(false));

  useEffect(() => {
    if (error !== null) setShowErrorModal(true);
  }, [error]);

  useEffect(() => {
    getAll();
  }, []);

  // View modal
  const [pergjigja, setPergjigja] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  useEscapeKey(showViewModal, () => setShowViewModal(false));

  // Create modal
  const [pergjigjetForm, setPergjigjetForm] = useState(FORM);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createPergjigje = async (e) => {
    e.preventDefault();
    create(pergjigjetForm);
    setShowCreateModal(false);
    setPergjigjetForm(FORM);
  };
  useEscapeKey(showCreateModal, () => {
    setShowCreateModal(false);
    setPergjigjetForm(FORM);
  });

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deletePergjigje = async () => {
    remove(pergjigja.id);
    setShowDeleteModal(false);
    setPergjigja(null);
  };
  useEscapeKey(showDeleteModal, () => {
    setShowDeleteModal(false);
    setPergjigja(null);
  });

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Pergjigjet e Tiketave</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowCreateModal(true)}
      >
        Shto Pergjigje
      </button>

      {pergjigjet && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Tiketi ID</th>
                <th>Autori</th>
                <th>Lloji</th>
                <th>Mesazhi</th>
                <th>Data Hapjes</th>
                <th>Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {pergjigjet.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => {
                    setPergjigja(p);
                    setShowViewModal(true);
                  }}
                >
                  <td>{p.id}</td>
                  <td>{p.tiketi_id}</td>
                  <td>{p.autori}</td>
                  <td>{p.lloji}</td>
                  <td>{p.mesazhi?.slice(0, 30)}...</td>
                  <td>{p.data_hapjes?.slice(0, 10)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setPergjigja(p);
                        setShowDeleteModal(true);
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

      {showViewModal && pergjigja && (
        <Modal
          show={showViewModal}
          onClose={() => setShowViewModal(false)}
          title={`Pergjigja: #${pergjigja.id}`}
        >
          <div className="modal-body">
            <PergjigjetDisplay pergjigja={pergjigja} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showCreateModal && (
        <Modal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Shto Pergjigje"
        >
          <div className="modal-body">
            <PergjigjetForm
              form={pergjigjetForm}
              setForm={setPergjigjetForm}
              onSubmit={createPergjigje}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showDeleteModal && pergjigja && (
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title={`Deshironi ta fshini pergjigjen: #${pergjigja.id}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deletePergjigje()}>
              Po, Fshij
            </button>
            <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
              Jo, Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showErrorModal && (
        <ErrorModal
          show={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          errorCode={error?.response?.status}
          errorBody={error?.response?.data}
          errorText={error?.response?.statusText}
        />
      )}
    </div>
  );
}

export default AdminPergjigjet;