import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";

import { getStatusBadgeAbonimi } from "../../../utils/statusUtils";
import { useEscapeKey } from "../../../hooks/useEscapeKey";

import AbonimiForm from "../components/Forms/AbonimiForm";
import AbonimiDisplay from "../components/Display/AbonimiDisplay";

const FORM = {
  klienti_id: 0,
  paketa_id: 0,
  data_fillimit: new Date(),
  data_skadimit: new Date(),
  statusi: "aktiv",
  cmimi: 0,
  periudha: "mujore",
  auto_rinovim: false,
};

const URL = "http://127.0.0.1:8000/api/admin/abonimi";
function AdminAbonimi() {
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

  const [abonimet, setAbonimet] = useState([]);
  const getAbonimet = async () => {
    try {
      const res = await axios.get(URL, HEADERS);

      setAbonimet(res.data);
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    }
  };
  useEffect(() => {
    getAbonimet();
  }, []);

  const [abonimi, setAbonimi] = useState(null);
  const [showAbonimiModal, setShowAbonimiModal] = useState(false);
  useEscapeKey(showAbonimiModal, () => {
    setShowAbonimiModal(false);
  });

  const [showAbonimiCreateModal, setShowAbonimiCreateModal] = useState(false);
  const [abonimiForm, setAbonimiForm] = useState(FORM);
  const createAbonimi = async (e) => {
    e.preventDefault();
    console.log(abonimiForm);
  };
  useEscapeKey(showAbonimiCreateModal, () => {
    setShowAbonimiCreateModal(false);
  });

  const [showAbonimiDeleteModal, setShowAbonimiDeleteModal] = useState(false);
  const deleteAbonimi = async () => {
    try {
      await axios.delete(URL + "/" + abonimi.id, HEADERS);

      getAbonimet();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowAbonimiDeleteModal(false);
      setAbonimi(null);
    }
  };
  useEscapeKey(showAbonimiDeleteModal, () => {
    setShowAbonimiDeleteModal(false);
    setAbonimi(null);
  });

  return (
    <div>
      <h1>Abonimet</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowAbonimiCreateModal(true)}
      >
        Shto Abonim
      </button>

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
                    setShowAbonimiModal(true);
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
                      // onClick={() => {
                      //   setShowAbonimiUpdateModal(true);
                      //   setAbonimi(abonimi);
                      //   setAbonimiForm(abonimi);
                      // }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setShowAbonimiDeleteModal(true);
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

      {showAbonimiModal && (
        <Modal
          show={showAbonimiModal}
          onClose={() => setShowAbonimiModal(false)}
          title={`Abonimi #${abonimi.id}`}
        >
          <div className="modal-body">
            <AbonimiDisplay abonimi={abonimi} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowAbonimiModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showAbonimiCreateModal && (
        <Modal
          show={showAbonimiCreateModal}
          onClose={() => setShowAbonimiCreateModal(false)}
          title="Krijo Pakete"
        >
          <div className="modal-body">
            <AbonimiForm
              form={abonimiForm}
              setForm={setAbonimiForm}
              onSubmit={createAbonimi}
            />
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowAbonimiCreateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showAbonimiDeleteModal && (
        <Modal
          show={showAbonimiDeleteModal}
          onClose={() => setShowAbonimiDeleteModal(false)}
          title={`Deshironi ta fshini abonimin: #${abonimi.id}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deleteAbonimi()}>
              Po, Fshij
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowAbonimiDeleteModal(false)}
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

export default AdminAbonimi;
