import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";
import Loader from "../../../components/Common/Loader";

import { ABONIMI_FORM } from "../constants/forms";

// import { validateAbonimi } from "../../../utils/validators";
import { getStatusBadgeAbonimi } from "../../../utils/statusUtils";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import useAdminCrud from "../../../hooks/useAdminCrud";

import AbonimiForm from "../components/Forms/AbonimiForm";
import AbonimiDisplay from "../components/Display/AbonimiDisplay";

function AdminAbonimi() {
  const {
    data: abonimet,
    error,
    loading,
    getAll,
    getOne,
    create,
    update,
    remove,
  } = useAdminCrud("abonimi");
  const { data: klientet, getAll: klientiGetAll } = useAdminCrud("klienti");
  const { data: paketat, getAll: paketaGetAll } = useAdminCrud("paketa");

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
    setAbonimi(null);
    setAbonimiForm(ABONIMI_FORM);
  };

  useEffect(() => {
    if (error !== null) {
      openModal("error");
    }
  }, [error]);

  useEffect(() => {
    getAll();
    klientiGetAll();
    paketaGetAll();
  }, []);

  const [abonimi, setAbonimi] = useState(null);

  const [abonimiForm, setAbonimiForm] = useState(ABONIMI_FORM);
  const createAbonimi = async (e) => {
    e.preventDefault();
    // if (!validateAbonimi(abonimiForm, false)) return;

    create(abonimiForm);
    closeModal("create");
  };

  const updateAbonimi = async (e) => {
    e.preventDefault();

    update(abonimi.id, abonimiForm);
    closeModal("update");
  };

  const deleteAbonimi = async () => {
    remove(abonimi.id);
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
    setAbonimi(null);
    setAbonimiForm(ABONIMI_FORM);
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <>
        <h1>Abonimet</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setAbonimiForm({
              ...abonimiForm,
              klienti_id: klientet[0].id,
              paketa_id: paketat[0].id,
              cmimi: Number(paketat[0].cmimi_mujor),
            });
            openModal("create");
          }}
        >
          Shto Abonim
        </button>
      </>

      {abonimet && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"># Klienti</th>
                <th scope="col"># Paketa</th>
                <th scope="col">Data Fillimit</th>
                <th scope="col">Data Skadimit</th>
                <th scope="col">Statusi</th>
                <th scope="col">Cmimi</th>
                <th scope="col">Periudha</th>
                <th scope="col">Auto Rinovim</th>
                <th scope="col">Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {abonimet.map((abonimi) => (
                <tr
                  key={abonimi.id}
                  onClick={() => {
                    setAbonimi(abonimi);
                    openModal("show");
                  }}
                >
                  <td>{abonimi.id}</td>
                  <td># {abonimi.klienti_id}</td>
                  <td># {abonimi.paketa_id}</td>
                  <td>{abonimi.data_fillimit}</td>
                  <td>{abonimi.data_skadimit}</td>
                  <td>
                    <span
                      className={`${getStatusBadgeAbonimi(abonimi.statusi)}`}
                      style={{
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    >
                      {abonimi.statusi}
                    </span>
                  </td>
                  <td>{abonimi.cmimi}</td>
                  <td>{abonimi.periudha}</td>
                  <td>{abonimi.auto_rinovim === 1 ? "Po" : "Jo"}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        openModal("update");
                        setAbonimi(abonimi);
                        setAbonimiForm(abonimi);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        openModal("delete");
                        setAbonimi(abonimi);
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
          title={`Abonimi #${abonimi.id}`}
        >
          <div className="modal-body">
            <AbonimiDisplay abonimi={abonimi} />
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
            <AbonimiForm
              form={abonimiForm}
              setForm={setAbonimiForm}
              onSubmit={createAbonimi}
              klientet={klientet}
              paketat={paketat}
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
          title={`Perditso Abonimin #${abonimi.id}`}
        >
          <div className="modal-body">
            <AbonimiForm
              form={abonimiForm}
              setForm={setAbonimiForm}
              onSubmit={updateAbonimi}
              klientet={klientet}
              paketat={paketat}
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
          title={`Deshironi ta fshini abonimin: #${abonimi.id}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deleteAbonimi()}>
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

export default AdminAbonimi;
