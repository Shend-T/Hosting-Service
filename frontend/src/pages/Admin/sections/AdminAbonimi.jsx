import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";

import { getStatusBadgeAbonimi } from "../../../utils/statusUtils";
import { useEscapeKey } from "../../../hooks/useEscapeKey";

import AbonimiForm from "../components/Forms/AbonimiForm";
import AbonimiDisplay from "../components/Display/AbonimiDisplay";

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
                      // onClick={() => {
                      //   setShowAbonimiDeleteModal(true);
                      //   setAbonimi(abonimi);
                      // }}
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
