import React, { useState, useEffect } from "react";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";
import Loader from "../../../components/Common/Loader";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import useAdminCrud from "../../../hooks/useAdminCrud";

import TiketaForm from "../components/Forms/TiketaForm";
import TiketaDisplay from "../components/Display/TiketaDisplay";

const FORM = {
  klienti_id: 0,
  titulli: "",
  pershkrimi: "",
  prioriteti: "normal",
  statusi: "hapur",
  kategoria: "",
};

function AdminTiketa() {
  const {
    data: tiketa,
    error,
    loading,
    getAll,
    create,
    update,
    remove,
  } = useAdminCrud("tiketa");

  const [showErrorModal, setShowErrorModal] = useState(false);
  useEscapeKey(showErrorModal, () => setShowErrorModal(false));

  useEffect(() => {
    if (error !== null) setShowErrorModal(true);
  }, [error]);

  useEffect(() => {
    getAll();
  }, []);

  // View modal
  const [tiketi, setTiketi] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  useEscapeKey(showViewModal, () => setShowViewModal(false));

  // Create modal
  const [tiketaForm, setTiketaForm] = useState(FORM);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createTiketi = async (e) => {
    e.preventDefault();
    create(tiketaForm);
    setShowCreateModal(false);
    setTiketaForm(FORM);
  };
  useEscapeKey(showCreateModal, () => {
    setShowCreateModal(false);
    setTiketaForm(FORM);
  });

  // Update modal
  const [tiketaUpdateForm, setTiketaUpdateForm] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const updateTiketi = async (e) => {
    e.preventDefault();
    update(tiketi.id, tiketaUpdateForm);
    setShowUpdateModal(false);
    setTiketi(null);
    setTiketaUpdateForm(null);
  };
  useEscapeKey(showUpdateModal, () => {
    setShowUpdateModal(false);
    setTiketi(null);
    setTiketaUpdateForm(null);
  });

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteTiketi = async () => {
    remove(tiketi.id);
    setShowDeleteModal(false);
    setTiketi(null);
  };
  useEscapeKey(showDeleteModal, () => {
    setShowDeleteModal(false);
    setTiketi(null);
  });

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Tiketat</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowCreateModal(true)}
      >
        Shto Tiket
      </button>

      {tiketa && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Titulli</th>
                <th>Kategoria</th>
                <th>Prioriteti</th>
                <th>Statusi</th>
                <th>Klienti ID</th>
                <th>Data Hapjes</th>
                <th>Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {tiketa.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => {
                    setTiketi(t);
                    setShowViewModal(true);
                  }}
                >
                  <td>{t.id}</td>
                  <td>{t.titulli}</td>
                  <td>{t.kategoria}</td>
                  <td>{t.prioriteti}</td>
                  <td>{t.statusi}</td>
                  <td>{t.klienti_id}</td>
                  <td>{t.data_hapjes?.slice(0, 10)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        setTiketi(t);
                        setTiketaUpdateForm(t);
                        setShowUpdateModal(true);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setTiketi(t);
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

      {showViewModal && tiketi && (
        <Modal
          show={showViewModal}
          onClose={() => setShowViewModal(false)}
          title={`Tiketi: #${tiketi.id} - ${tiketi.titulli}`}
        >
          <div className="modal-body">
            <TiketaDisplay tiketi={tiketi} />
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
          title="Shto Tiket"
        >
          <div className="modal-body">
            <TiketaForm
              form={tiketaForm}
              setForm={setTiketaForm}
              onSubmit={createTiketi}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showUpdateModal && tiketi && (
        <Modal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title={`Perditso Tiketin: #${tiketi.id} - ${tiketi.titulli}`}
        >
          <div className="modal-body">
            <TiketaForm
              form={tiketaUpdateForm}
              setForm={setTiketaUpdateForm}
              onSubmit={updateTiketi}
              isEdit={true}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showDeleteModal && tiketi && (
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title={`Deshironi ta fshini tiketin: #${tiketi.id} - ${tiketi.titulli}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deleteTiketi()}>
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

export default AdminTiketa;