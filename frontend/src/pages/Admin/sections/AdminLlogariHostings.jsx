import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";

import { getStatusBadgePaketa } from "../../../utils/statusUtils";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import LlogariHostingsForm from "../components/Forms/LlogariHostingsForm";
import LlogariHostingsDisplay from "../components/Display/LlogariHostingsDisplay";

const URL = "http://127.0.0.1:8000/api/admin/llogari-hostings";
const ABONIMI_URL = "http://127.0.0.1:8000/api/admin/abonimi";
const SERVERS_URL = "http://127.0.0.1:8000/api/admin/servers";

const FORM = {
  abonimi_id: "",
  server_id: "",
  username: "",
  hapesira_perdorur: 0,
  bandwith_perdorur: 0,
  data_krijimit: "",
  statusi: "aktiv",
  ip_dedikuar: "",
};

function AdminLlogariHostings() {
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
  const [serveret, setServeret] = useState([]);

  const [llogariHostings, setLlogariHostings] = useState([]);
  const getLlogariHostings = async () => {
    try {
      const res = await axios.get(URL, HEADERS);
      setLlogariHostings(res.data);
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    getLlogariHostings();
  }, []);

  useEffect(() => {
    const getAbonimet = async () => {
      try {
        const res = await axios.get(ABONIMI_URL, HEADERS);
        setAbonimet(res.data);
      } catch (error) {
        setError(error);
        setShowErrorModal(true);
      }
    };
    getAbonimet();
  }, []);

  useEffect(() => {
    const getServeret = async () => {
      try {
        const res = await axios.get(SERVERS_URL, HEADERS);
        setServeret(res.data);
      } catch (error) {
        setError(error);
        setShowErrorModal(true);
      }
    };
    getServeret();
  }, []);

  const [showLlogariModal, setShowLlogariModal] = useState(false);
  useEscapeKey(showLlogariModal, () => {
    setShowLlogariModal(false);
  });

  const validateLlogariHosting = (form) => {
    let inputErrors = "";

    if (!form.abonimi_id) inputErrors += " Abonimi eshte i detyrushem";
    if (!form.server_id) inputErrors += " Serveri eshte i detyrushem";
    if (!form.username?.trim()) inputErrors += " Username eshte i detyrushem";
    if (form.hapesira_perdorur < 0)
      inputErrors += " Hapesira e perdorur nuk mund te jete negative";
    if (form.bandwith_perdorur < 0)
      inputErrors += " Bandwidth nuk mund te jete negativ";
    if (!form.data_krijimit?.trim())
      inputErrors += " Data krijimit eshte e detyrueshme";

    if (inputErrors.length !== 0) alert(inputErrors);
    return inputErrors.length === 0;
  };

  const [llogariForm, setLlogariForm] = useState(FORM);
  const [showLlogariCreateModal, setShowLlogariCreateModal] = useState(false);
  const createLlogariHosting = async (e) => {
    e.preventDefault();
    if (!validateLlogariHosting(llogariForm)) return;

    try {
      await axios.post(URL, llogariForm, HEADERS);
      getLlogariHostings();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowLlogariCreateModal(false);
      setLlogariForm(FORM);
    }
  };
  useEscapeKey(showLlogariCreateModal, () => {
    setShowLlogariCreateModal(false);
  });

  const [llogari, setLlogari] = useState(null);
  const [llogariUpdateForm, setLlogariUpdateForm] = useState(null);
  const [showLlogariUpdateModal, setShowLlogariUpdateModal] = useState(false);

  const updateLlogariHosting = async (e) => {
    e.preventDefault();
    if (!validateLlogariHosting(llogariUpdateForm)) return;

    try {
      await axios.put(URL + "/" + llogari.id, llogariUpdateForm, HEADERS);
      getLlogariHostings();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowLlogariUpdateModal(false);
      setLlogari(null);
      setLlogariUpdateForm(null);
    }
  };
  useEscapeKey(showLlogariUpdateModal, () => {
    setShowLlogariUpdateModal(false);
    setLlogari(null);
    setLlogariUpdateForm(null);
  });

  const [showLlogariDeleteModal, setShowLlogariDeleteModal] = useState(false);
  const deleteLlogariHosting = async () => {
    try {
      await axios.delete(URL + "/" + llogari.id, HEADERS);
      getLlogariHostings();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowLlogariDeleteModal(false);
      setLlogari(null);
    }
  };
  useEscapeKey(showLlogariDeleteModal, () => {
    setShowLlogariDeleteModal(false);
    setLlogari(null);
  });

  return (
    <div>
      <>
        <h1>Llogaritë e Hostingut</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowLlogariCreateModal(true);
          }}
        >
          Shto Llogari Hosting
        </button>
      </>

      {llogariHostings && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"># Abonimi</th>
                <th scope="col"># Serveri</th>
                <th scope="col">Username</th>
                <th scope="col">Hapesira GB</th>
                <th scope="col">Bandwidth GB</th>
                <th scope="col">Data Krijimit</th>
                <th scope="col">Statusi</th>
                <th scope="col">IP Dedikuar</th>
                <th scope="col">Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {llogariHostings.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => {
                    setLlogari(l);
                    setShowLlogariModal(true);
                  }}
                >
                  <td>{l.id}</td>
                  <td>{l.abonimi_id}</td>
                  <td>{l.server_id}</td>
                  <td>{l.username}</td>
                  <td>{l.hapesira_perdorur}</td>
                  <td>{l.bandwith_perdorur}</td>
                  <td>{l.data_krijimit}</td>
                  <td>
                    <span
                      className={`${getStatusBadgePaketa(l.statusi)}`}
                      style={{
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    >
                      {l.statusi}
                    </span>
                  </td>
                  <td>{l.ip_dedikuar}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        setShowLlogariUpdateModal(true);
                        setLlogari(l);
                        setLlogariUpdateForm(l);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setShowLlogariDeleteModal(true);
                        setLlogari(l);
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

      {showLlogariModal && (
        <Modal
          show={showLlogariModal}
          onClose={() => setShowLlogariModal(false)}
          title={`Llogari Hosting: #${llogari.id} - ${llogari.username}`}
        >
          <div className="modal-body">
            <LlogariHostingsDisplay llogariHosting={llogari} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowLlogariModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showLlogariCreateModal && (
        <Modal
          show={showLlogariCreateModal}
          onClose={() => setShowLlogariCreateModal(false)}
          title="Shto Llogari Hosting"
        >
          <div className="modal-body">
            <LlogariHostingsForm
              form={llogariForm}
              setForm={setLlogariForm}
              onSubmit={createLlogariHosting}
              abonimiOptions={abonimet}
              serverOptions={serveret}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowLlogariCreateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showLlogariUpdateModal && (
        <Modal
          show={showLlogariUpdateModal}
          onClose={() => setShowLlogariUpdateModal(false)}
          title={`Perditso Llogarine: #${llogari.id} - ${llogari.username}`}
        >
          <div className="modal-body">
            <LlogariHostingsForm
              form={llogariUpdateForm}
              setForm={setLlogariUpdateForm}
              onSubmit={updateLlogariHosting}
              isEdit={true}
              abonimiOptions={abonimet}
              serverOptions={serveret}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowLlogariUpdateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showLlogariDeleteModal && (
        <Modal
          show={showLlogariDeleteModal}
          onClose={() => setShowLlogariDeleteModal(false)}
          title={`Deshironi ta fshini llogarine: #${llogari.id} - ${llogari.username}`}
        >
          <div className="modal-footer">
            <button
              className="btn btn-danger"
              onClick={() => deleteLlogariHosting()}
            >
              Po, Fshij
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowLlogariDeleteModal(false)}
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

export default AdminLlogariHostings;
