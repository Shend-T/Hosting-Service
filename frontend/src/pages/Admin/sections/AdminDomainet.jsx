import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import Modal from "../../../components/Common/Modal";
import ErrorModal from "../../../components/Error/ErrorModal";

import { getStatusBadgeKlienti } from "../../../utils/statusUtils";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import DomainetForm from "../components/Forms/DomainetForm";
import DomainetDisplay from "../components/Display/DomainetDisplay";

const URL = "http://127.0.0.1:8000/api/admin/domainet";
const KLIENTI_URL = "http://127.0.0.1:8000/api/admin/klienti";
const LLOGARI_URL = "http://127.0.0.1:8000/api/admin/llogari-hostings";

const FORM = {
  klienti_id: "",
  llogari_hostings_id: "",
  emri_domainit: "",
  tld: ".ubt",
  nameserverat: "ns1.ubthostingservices.com,ns2.ubthostingservices.com",
  statusi: "aktiv",
  data_regjistrimit: "",
  data_skadimit: "",
};

function AdminDomainet() {
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

  const [klientet, setKlientet] = useState([]);
  const [llogariHostings, setLlogariHostings] = useState([]);

  const [domainet, setDomainet] = useState([]);
  const getDomainet = async () => {
    try {
      const res = await axios.get(URL, HEADERS);
      setDomainet(res.data);
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    getDomainet();
  }, []);

  useEffect(() => {
    const getKlientet = async () => {
      try {
        const res = await axios.get(KLIENTI_URL, HEADERS);
        setKlientet(res.data);
      } catch (error) {
        setError(error);
        setShowErrorModal(true);
      }
    };
    getKlientet();
  }, []);

  useEffect(() => {
    const getLlogariHostingsList = async () => {
      try {
        const res = await axios.get(LLOGARI_URL, HEADERS);
        setLlogariHostings(res.data);
      } catch (error) {
        setError(error);
        setShowErrorModal(true);
      }
    };
    getLlogariHostingsList();
  }, []);

  const [showDomainModal, setShowDomainModal] = useState(false);
  useEscapeKey(showDomainModal, () => {
    setShowDomainModal(false);
  });

  const validateDomain = (form) => {
    let inputErrors = "";

    if (!form.klienti_id) inputErrors += " Klienti eshte i detyrushem";
    if (!form.llogari_hostings_id)
      inputErrors += " Llogaria e hostingut eshte e detyrueshme";
    if (!form.emri_domainit?.trim())
      inputErrors += " Emri i domainit eshte i detyrushem";
    if (!form.data_regjistrimit?.trim())
      inputErrors += " Data regjistrimit eshte e detyrueshme";
    if (!form.data_skadimit?.trim())
      inputErrors += " Data skadimit eshte e detyrueshme";

    if (inputErrors.length !== 0) alert(inputErrors);
    return inputErrors.length === 0;
  };

  const [domainForm, setDomainForm] = useState(FORM);
  const [showDomainCreateModal, setShowDomainCreateModal] = useState(false);
  const createDomain = async (e) => {
    e.preventDefault();
    if (!validateDomain(domainForm)) return;

    try {
      await axios.post(URL, domainForm, HEADERS);
      getDomainet();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowDomainCreateModal(false);
      setDomainForm(FORM);
    }
  };
  useEscapeKey(showDomainCreateModal, () => {
    setShowDomainCreateModal(false);
  });

  const [domain, setDomain] = useState(null);
  const [domainUpdateForm, setDomainUpdateForm] = useState(null);
  const [showDomainUpdateModal, setShowDomainUpdateModal] = useState(false);

  const updateDomain = async (e) => {
    e.preventDefault();
    if (!validateDomain(domainUpdateForm)) return;

    try {
      await axios.put(URL + "/" + domain.id, domainUpdateForm, HEADERS);
      getDomainet();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowDomainUpdateModal(false);
      setDomain(null);
      setDomainUpdateForm(null);
    }
  };
  useEscapeKey(showDomainUpdateModal, () => {
    setShowDomainUpdateModal(false);
    setDomain(null);
    setDomainUpdateForm(null);
  });

  const [showDomainDeleteModal, setShowDomainDeleteModal] = useState(false);
  const deleteDomain = async () => {
    try {
      await axios.delete(URL + "/" + domain.id, HEADERS);
      getDomainet();
    } catch (error) {
      setError(error);
      setShowErrorModal(true);
    } finally {
      setShowDomainDeleteModal(false);
      setDomain(null);
    }
  };
  useEscapeKey(showDomainDeleteModal, () => {
    setShowDomainDeleteModal(false);
    setDomain(null);
  });

  return (
    <div>
      <>
        <h1>Domainet</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowDomainCreateModal(true);
          }}
        >
          Shto Domain
        </button>
      </>

      {domainet && (
        <div className="table-responsive-md">
          <table className="table text-center fs-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Klienti</th>
                <th scope="col">Llogaria</th>
                <th scope="col">Domaini</th>
                <th scope="col">TLD</th>
                <th scope="col">Statusi</th>
                <th scope="col">Data Regjistrimit</th>
                <th scope="col">Data Skadimit</th>
                <th scope="col">Aksionet</th>
              </tr>
            </thead>
            <tbody>
              {domainet.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => {
                    setDomain(d);
                    setShowDomainModal(true);
                  }}
                >
                  <td>{d.id}</td>
                  <td>{d.klienti_id}</td>
                  <td>{d.llogari_hostings_id}</td>
                  <td>{d.emri_domainit}</td>
                  <td>{d.tld}</td>
                  <td>
                    <span
                      className={`${getStatusBadgeKlienti(d.statusi)}`}
                      style={{
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    >
                      {d.statusi}
                    </span>
                  </td>
                  <td>{d.data_regjistrimit}</td>
                  <td>{d.data_skadimit}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="table-btn btn btn-warning m-2"
                      onClick={() => {
                        setShowDomainUpdateModal(true);
                        setDomain(d);
                        setDomainUpdateForm(d);
                      }}
                    >
                      Perditso
                    </button>
                    <button
                      className="table-btn btn btn-danger"
                      onClick={() => {
                        setShowDomainDeleteModal(true);
                        setDomain(d);
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

      {showDomainModal && (
        <Modal
          show={showDomainModal}
          onClose={() => setShowDomainModal(false)}
          title={`Domain: #${domain.id} - ${domain.emri_domainit}${domain.tld}`}
        >
          <div className="modal-body">
            <DomainetDisplay domain={domain} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowDomainModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showDomainCreateModal && (
        <Modal
          show={showDomainCreateModal}
          onClose={() => setShowDomainCreateModal(false)}
          title="Shto Domain"
        >
          <div className="modal-body">
            <DomainetForm
              form={domainForm}
              setForm={setDomainForm}
              onSubmit={createDomain}
              klientiOptions={klientet}
              llogariHostingsOptions={llogariHostings}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowDomainCreateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showDomainUpdateModal && (
        <Modal
          show={showDomainUpdateModal}
          onClose={() => setShowDomainUpdateModal(false)}
          title={`Perditso Domainin: #${domain.id} - ${domain.emri_domainit}${domain.tld}`}
        >
          <div className="modal-body">
            <DomainetForm
              form={domainUpdateForm}
              setForm={setDomainUpdateForm}
              onSubmit={updateDomain}
              isEdit={true}
              klientiOptions={klientet}
              llogariHostingsOptions={llogariHostings}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowDomainUpdateModal(false)}
            >
              Mbyll
            </button>
          </div>
        </Modal>
      )}

      {showDomainDeleteModal && (
        <Modal
          show={showDomainDeleteModal}
          onClose={() => setShowDomainDeleteModal(false)}
          title={`Deshironi ta fshini domainin: #${domain.id} - ${domain.emri_domainit}${domain.tld}`}
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => deleteDomain()}>
              Po, Fshij
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowDomainDeleteModal(false)}
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

export default AdminDomainet;
