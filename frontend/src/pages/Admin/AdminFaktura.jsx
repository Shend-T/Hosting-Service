import React, { useState, useEffect } from "react";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";
import Loader from "../../../components/Common/Loader";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import useAdminCrud from "../../../hooks/useAdminCrud";

import FakturaForm from "../components/Forms/FakturaForm";
import FakturaDisplay from "../components/Display/FakturaDisplay";

const FORM = {
  klienti_id: 0,
  abonimi_id: 0,
  shuma: 0,
  data_leshimit: "",
  data_skadimit: "",
  statusi: "papaguar",
  pershkrimi: "",
};

function AdminFaktura() {
  const {
    data: faturat,
    error,
    loading,
    getAll,
    create,
    update,
    remove,
  } = useAdminCrud("faturat");

  const [showErrorModal, setShowErrorModal] = useState(false);
  useEscapeKey(showErrorModal, () => setShowErrorModal(false));

  useEffect(() => {
    if (error !== null) setShowErrorModal(true);
  }, [error]);

  useEffect(() => {
    getAll();
  }, []);

  // View modal
  const [faktura, setFaktura] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  useEscapeKey(showViewModal, () => setShowViewModal(false));

  // Create modal
  const [fakturaForm, setFakturaForm] = useState(FORM);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createFaktura = async (e) => {
    e.preventDefault();
    create(fakturaForm);
    setShowCreateModal(false);
    setFakturaForm(FORM);
  };
  useEscapeKey(showCreateModal, () => {
    setShowCreateModal(false);
    setFakturaForm(FORM);
  });

  // Update modal
  const [fakturaUpdateForm, setFakturaUpdateForm] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const updateFaktura = async (e) => {
    e.preventDefault();
    update(faktura.id, fakturaUpdateForm);
    setShowUpdateModal(false);
    setFaktura(null);
    setFakturaUpdateForm(null);
  };
  useEscapeKey(showUpdateModal, () => {
    setShowUpdateModal(false);
    setFaktura(null);
    setFakturaUpdateForm(null);
  });

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteFaktura = async () => {
    remove(faktura.id);
    setShowDeleteModal(false);
    setFaktura(null);
  };
  useEscapeKey(showDeleteModal, () => {
    setShowDeleteModal(false);
    setFaktura(null);
  });

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Faturat</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowCreateModal(true)}
      >
        Shto Fature
      </button>

      {faturat && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Klienti ID</th>
                <th>Abonimi ID</th>
                <th>Shuma</th>
                <th>Statusi</th>
                <th>Data Leshimit</th>
                <th>Data Skadimit</th>
                <th>Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {faturat.map((f) => (
                <tr
                  key={f.id}
                  onClick={() => {
                    setFaktura(f);
                    setShowViewModal(true);
                  }}
                >
                  <td>#INV-{String(f.id).padStart(4, "0")}</td>
                  <td>{f.klienti_id}</td>
                  <td>#AB-{String(f.abonimi_id).padStart(5, "0")}</td>
                  <td>€{Number(f.shuma).toFixed(2)}</td>
                  <td>{f.statusi}</td>
                  <td>{f.data_leshimit?.slice(0, 10)}</td>
                  <td>{f.data_skadimit?.slice(0, 10) || "—"}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        setFaktura(f);
                        setFakturaUpdateForm(f);
                        setShowUpdateModal(true);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setFaktura(f);
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

      {showViewModal && faktura && (
        <Modal
          show={showViewModal}
          onClose={() => setShowViewModal(false)}
          title={`Faktura: #INV-${String(faktura.id).padStart(4, "0")}`}
        >
          <div className="modal-body">
            <FakturaDisplay faktura={faktura} />
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
          title="Shto Fature"
        >
          <div className="modal-body">
            <FakturaForm
              form={fakturaForm}
              setForm={setFakturaForm}
              onSubmit={createFaktura}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showUpdateModal && faktura && (
        <Modal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title={`Perditso Faturën: #INV-${String(faktura.id).padStart(4, "0")}`}
        >
          <div className="modal-body">
            <FakturaForm
              form={fakturaUpdateForm}
              setForm={setFakturaUpdateForm}
              onSubmit={updateFaktura}
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

      {showDeleteModal && faktura && (
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title={`Deshironi ta fshini faturën: #INV-${String(faktura.id).padStart(4, "0")}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deleteFaktura()}>
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

export default AdminFaktura;