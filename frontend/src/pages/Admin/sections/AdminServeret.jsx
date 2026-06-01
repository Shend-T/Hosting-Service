import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";

import { getStatusBadgeKlienti } from "../../../utils/statusUtils";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import ServeretForm from "../components/Forms/ServeretForm";
import ServeretDisplay from "../components/Display/ServeretDisplay";

const URL = "http://127.0.0.1:8000/api/admin/servers";

const FORM = {
  emri: "",
  ip_adresa: "",
  lloji: "web",
  sistemi_operativ: "ubuntu",
  ram_gb: 1,
  cpu_core: 1,
  hapesira_tb: 1,
  lokacioni: "",
  statusi: "aktiv",
  data_instalimit: "",
};

function AdminServeret() {
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

  const [serveret, setServeret] = useState([]);
  const getServeret = async () => {
    try {
      const res = await axios.get(URL, HEADERS);
      setServeret(res.data);
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    }
  };
  useEffect(() => {
    getServeret();
  }, []);

  const [showServerModal, setShowServerModal] = useState(false);
  useEscapeKey(showServerModal, () => {
    setShowServerModal(false);
  });

  const validateServer = (form) => {
    let inputErrors = "";

    if (!form.emri?.trim()) inputErrors += " Emri eshte i detyrushem";
    if (!form.ip_adresa?.trim())
      inputErrors += " IP adresa eshte e detyrueshme";
    if (!form.lokacioni?.trim()) inputErrors += " Lokacioni eshte i detyrushem";
    if (!form.ram_gb || form.ram_gb < 1)
      inputErrors += " RAM duhet te jete te pakten 1 GB";
    if (!form.cpu_core || form.cpu_core < 1)
      inputErrors += " CPU core duhet te jete te pakten 1";
    if (!form.hapesira_tb || form.hapesira_tb < 0.5)
      inputErrors += " Hapesira duhet te jete te pakten 0.5 TB";
    if (!form.data_instalimit?.trim())
      inputErrors += " Data instalimit eshte e detyrueshme";

    if (inputErrors.length !== 0) alert(inputErrors);
    return inputErrors.length === 0;
  };

  const [serverForm, setServerForm] = useState(FORM);
  const [showServerCreateModal, setShowServerCreateModal] = useState(false);
  const createServer = async (e) => {
    e.preventDefault();
    if (!validateServer(serverForm)) return;

    try {
      await axios.post(URL, serverForm, HEADERS);
      getServeret();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowServerCreateModal(false);
      setServerForm(FORM);
    }
  };
  useEscapeKey(showServerCreateModal, () => {
    setShowServerCreateModal(false);
  });

  const [server, setServer] = useState(null);
  const [serverUpdateForm, setServerUpdateForm] = useState(null);
  const [showServerUpdateModal, setShowServerUpdateModal] = useState(false);

  const updateServer = async (e) => {
    e.preventDefault();
    if (!validateServer(serverUpdateForm)) return;

    try {
      await axios.put(URL + "/" + server.id, serverUpdateForm, HEADERS);
      getServeret();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowServerUpdateModal(false);
      setServer(null);
      setServerUpdateForm(null);
    }
  };
  useEscapeKey(showServerUpdateModal, () => {
    setShowServerUpdateModal(false);
    setServer(null);
    setServerUpdateForm(null);
  });

  const [showServerDeleteModal, setShowServerDeleteModal] = useState(false);
  const deleteServer = async () => {
    try {
      await axios.delete(URL + "/" + server.id, HEADERS);
      getServeret();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowServerDeleteModal(false);
      setServer(null);
    }
  };
  useEscapeKey(showServerDeleteModal, () => {
    setShowServerDeleteModal(false);
    setServer(null);
  });

  return (
    <div>
      <>
        <h1>Serverët</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowServerCreateModal(true);
          }}
        >
          Shto Server
        </button>
      </>

      {serveret && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Emri</th>
                <th scope="col">IP</th>
                <th scope="col">Lloji</th>
                <th scope="col">SO</th>
                <th scope="col">RAM</th>
                <th scope="col">CPU</th>
                <th scope="col">Hapesira TB</th>
                <th scope="col">Lokacioni</th>
                <th scope="col">Statusi</th>
                <th scope="col">Data Instalimit</th>
                <th scope="col">Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {serveret.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => {
                    setServer(s);
                    setShowServerModal(true);
                  }}
                >
                  <td>{s.id}</td>
                  <td>{s.emri}</td>
                  <td>{s.ip_adresa}</td>
                  <td>{s.lloji}</td>
                  <td>{s.sistemi_operativ}</td>
                  <td>{s.ram_gb}</td>
                  <td>{s.cpu_core}</td>
                  <td>{s.hapesira_tb}</td>
                  <td>{s.lokacioni}</td>
                  <td>
                    <span
                      className={`${getStatusBadgeKlienti(s.statusi)}`}
                      style={{
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    >
                      {s.statusi}
                    </span>
                  </td>
                  <td>{s.data_instalimit}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        setShowServerUpdateModal(true);
                        setServer(s);
                        setServerUpdateForm(s);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setShowServerDeleteModal(true);
                        setServer(s);
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

      {showServerModal && (
        <Modal
          show={showServerModal}
          onClose={() => setShowServerModal(false)}
          title={`Server: #${server.id} - ${server.emri}`}
        >
          <div className="modal-body">
            <ServeretDisplay server={server} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowServerModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showServerCreateModal && (
        <Modal
          show={showServerCreateModal}
          onClose={() => setShowServerCreateModal(false)}
          title="Shto Server"
        >
          <div className="modal-body">
            <ServeretForm
              form={serverForm}
              setForm={setServerForm}
              onSubmit={createServer}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowServerCreateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showServerUpdateModal && (
        <Modal
          show={showServerUpdateModal}
          onClose={() => setShowServerUpdateModal(false)}
          title={`Perditso Serverin: #${server.id} - ${server.emri}`}
        >
          <div className="modal-body">
            <ServeretForm
              form={serverUpdateForm}
              setForm={setServerUpdateForm}
              onSubmit={updateServer}
              isEdit={true}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowServerUpdateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showServerDeleteModal && (
        <Modal
          show={showServerDeleteModal}
          onClose={() => setShowServerDeleteModal(false)}
          title={`Deshironi ta fshini serverin: #${server.id} - ${server.emri}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deleteServer()}>
              Po, Fshij
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowServerDeleteModal(false)}
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

export default AdminServeret;
