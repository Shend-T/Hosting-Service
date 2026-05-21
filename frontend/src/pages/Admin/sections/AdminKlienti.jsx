import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

function AdminKlienti() {
  const URL = "http://127.0.0.1:8000/api/admin/klienti";

  const adminToken = useSelector((state) => state.admin.token);

  const [klientet, setKlientet] = useState([]);
  const getKlientet = async () => {
    try {
      const res = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setKlientet(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getKlientet();
  }, []);
  const getStatusBadge = (statusi) => {
    switch (statusi) {
      case "aktiv":
        return "badge bg-success text-white";
      case "jo-aktiv":
        return "badge bg-secondary text-white";
      case "suspenduar":
        return "badge bg-danger text-white";
      default:
        return "badge bg-secondary text-white";
    }
  };

  const [klientiForm, setKlientiForm] = useState({
    emri: "",
    mbiemri: "",
    kompania: "",
    email: "",
    password: "",
    telefoni: "",
    adresa: "",
    bilanci: 0,
    statusi: "aktiv",
  });
  const [showKlientiCreateModal, setShowKlientiCreateModal] = useState(false);

  const createKlienti = async (e) => {
    e.preventDefault();

    try {
      await axios.post(URL, klientiForm, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          Accept: "application/json",
        },
      });

      getKlientet();
      setShowKlientiCreateModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [klienti, setKlienti] = useState(null);
  const [klientiUpdateForm, setKlientiUpdateForm] = useState(null);
  const [showKlientiUpdateModal, setShowKlientiUpdateModal] = useState(false);

  const updateKlienti = async (e) => {
    e.preventDefault();

    try {
      await axios.put(URL + "/" + klienti.id, klientiUpdateForm, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          Accept: "application/json",
        },
      });
      setShowKlientiUpdateModal(false);
      setKlienti(null);
      setKlientiUpdateForm(null);
      getKlientet();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowKlientiUpdateModal(false);
        setKlienti(null);
        setKlientiUpdateForm(null);
      }
    };

    if (klienti) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [klienti]);

  const [showKlientiDeleteModal, setShowKlientiDeleteModal] = useState(false);
  const deleteKlienti = async () => {
    try {
      await axios.delete(URL + "/" + klienti.id, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          Accept: "application/json",
        },
      });
      setShowKlientiDeleteModal(false);
      setKlienti(null);
      getKlientet();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Klientet</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowKlientiCreateModal(true)}
      >
        Shto Klient
      </button>

      {klientet !== [] ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Emri</th>
              <th scope="col">Mbiemri</th>
              <th scope="col">Kompania</th>
              <th scope="col">Email</th>
              <th scope="col">Telefoni</th>
              <th scope="col">Adresa</th>
              <th scope="col">Bilanci</th>
              <th scope="col">Statusi</th>
              <th scope="col">Data Regjistrimit</th>
              <th scope="col">Aksionet</th>
              {/* Spo di term ma tmir se aksionet */}
            </tr>
          </thead>
          <tbody>
            {klientet.map((klienti) => (
              <tr key={klienti.id}>
                <th scope="row">{klienti.id}</th>
                <td>{klienti.emri}</td>
                <td>{klienti.mbiemri}</td>
                <td>{klienti.kompania}</td>
                <td>{klienti.email}</td>
                <td>{klienti.telefoni}</td>
                <td>{klienti.adresa}</td>
                <td>{klienti.bilanci}</td>
                <td
                  className={getStatusBadge(klienti.statusi)}
                  style={{ padding: "5px", fontSize: "8px", marginTop: "5px" }}
                >
                  {klienti.statusi}
                </td>
                <td>{klienti.data_regjistrimit}</td>
                <td>
                  <button
                    className="table-btn btn btn-warning mx-2"
                    onClick={() => {
                      setShowKlientiUpdateModal(true);
                      setKlienti(klienti);
                      setKlientiUpdateForm(klienti);
                    }}
                  >
                    Perditso
                  </button>
                  <button
                    className="table-btn btn btn-danger"
                    onClick={() => {
                      setShowKlientiDeleteModal(true);
                      setKlienti(klienti);
                    }}
                  >
                    Fshij
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nuk ka klient aktiv momentalisht</p>
      )}

      {showKlientiCreateModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowKlientiCreateModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ padding: "1vh 1vw" }}>
              <div className="modal-header">
                <h5 className="modal-title">Shto Klient</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowKlientiCreateModal(false)}
                />
              </div>

              <div className="modal-body">
                <form onSubmit={createKlienti}>
                  <div className="mb-3">
                    <label htmlFor="emri" className="form-label">
                      Emri
                    </label>
                    <input
                      type="text"
                      name="emri"
                      className="form-control"
                      id="emri"
                      value={klientiForm.emri}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          emri: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mbiemri" className="form-label">
                      Mbiemri
                    </label>
                    <input
                      type="text"
                      name="mbiemri"
                      className="form-control"
                      id="mbiemri"
                      value={klientiForm.mbiemri}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          mbiemri: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="kompania" className="form-label">
                      Kompania
                    </label>
                    <input
                      type="text"
                      name="kompania"
                      className="form-control"
                      id="kompania"
                      value={klientiForm.kompania}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          kompania: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      value={klientiForm.email}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password-i
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      value={klientiForm.password}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telefoni" className="form-label">
                      Telefoni
                    </label>
                    <input
                      type="text"
                      name="telefoni"
                      className="form-control"
                      id="telefoni"
                      value={klientiForm.telefoni}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          telefoni: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="adresa" className="form-label">
                      Adresa
                    </label>
                    <input
                      type="text"
                      name="adresa"
                      className="form-control"
                      id="adresa"
                      value={klientiForm.adresa}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          adresa: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bilanci" className="form-label">
                      Bilanci
                    </label>
                    <input
                      type="number"
                      name="bilanci"
                      className="form-control"
                      id="bilanci"
                      value={klientiForm.bilanci}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          bilanci: Number(e.target.value),
                        })
                      }
                      min={0}
                      step="1.00"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="statusi" className="form-label">
                      Statusi
                    </label>
                    <select
                      name="statusi"
                      className="form-select"
                      id="statusi"
                      value={klientiForm.statusi}
                      onChange={(e) =>
                        setKlientiForm({
                          ...klientiForm,
                          statusi: e.target.value,
                        })
                      }
                    >
                      <option value="aktiv">aktiv</option>
                      <option value="jo-aktiv">jo-aktiv</option>
                      <option value="suspenduar">suspenduar</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Shto Klient
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKlientiUpdateModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowKlientiUpdateModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ padding: "1vh 1vw" }}>
              <div className="modal-header">
                <h5 className="modal-title">
                  Perditso Klientin: #{klienti.id} - {klienti.emri}{" "}
                  {klienti.mbiemri}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowKlientiUpdateModal(false)}
                />
              </div>

              <div className="modal-body">
                <form onSubmit={updateKlienti}>
                  <div className="mb-3">
                    <label htmlFor="emri" className="form-label">
                      Emri
                    </label>
                    <input
                      type="text"
                      name="emri"
                      className="form-control"
                      id="emri"
                      value={klientiUpdateForm.emri}
                      onChange={(e) =>
                        setKlientiUpdateForm({
                          ...klientiUpdateForm,
                          emri: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mbiemri" className="form-label">
                      Mbiemri
                    </label>
                    <input
                      type="text"
                      name="mbiemri"
                      className="form-control"
                      id="mbiemri"
                      value={klientiUpdateForm.mbiemri}
                      onChange={(e) =>
                        setKlientiUpdateForm({
                          ...klientiUpdateForm,
                          mbiemri: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="kompania" className="form-label">
                      Kompania
                    </label>
                    <input
                      type="text"
                      name="kompania"
                      className="form-control"
                      id="kompania"
                      value={klientiUpdateForm.kompania}
                      onChange={(e) =>
                        setKlientiUpdateForm({
                          ...klientiUpdateForm,
                          kompania: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      value={klientiUpdateForm.email}
                      onChange={(e) =>
                        setKlientiUpdateForm({
                          ...klientiUpdateForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telefoni" className="form-label">
                      Telefoni
                    </label>
                    <input
                      type="text"
                      name="telefoni"
                      className="form-control"
                      id="telefoni"
                      value={klientiUpdateForm.telefoni}
                      onChange={(e) =>
                        setKlientiUpdateForm({
                          ...klientiUpdateForm,
                          telefoni: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="adresa" className="form-label">
                      Adresa
                    </label>
                    <input
                      type="text"
                      name="adresa"
                      className="form-control"
                      id="adresa"
                      value={klientiUpdateForm.adresa}
                      onChange={(e) =>
                        setKlientiUpdateForm({
                          ...klientiUpdateForm,
                          adresa: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bilanci" className="form-label">
                      Bilanci
                    </label>
                    <input
                      type="number"
                      name="bilanci"
                      className="form-control"
                      id="bilanci"
                      value={klientiUpdateForm.bilanci}
                      onChange={(e) =>
                        setKlientiUpdateForm({
                          ...klientiUpdateForm,
                          bilanci: Number(e.target.value),
                        })
                      }
                      min={0}
                      step="1.00"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="statusi" className="form-label">
                      Statusi
                    </label>
                    <select
                      name="statusi"
                      className="form-select"
                      id="statusi"
                      value={klientiUpdateForm.statusi}
                      onChange={(e) =>
                        setKlientiUpdateForm({
                          ...klientiUpdateForm,
                          statusi: e.target.value,
                        })
                      }
                    >
                      <option value="aktiv">aktiv</option>
                      <option value="jo-aktiv">jo-aktiv</option>
                      <option value="suspenduar">suspenduar</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Perditso
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowKlientiUpdateModal(false)}
                >
                  Mbyll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKlientiDeleteModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowKlientiDeleteModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ padding: "1vh 1vw" }}>
              <div className="modal-header">
                <h5 className="modal-title">
                  Deshironi ta fshini klientin: #{klienti.id} - {klienti.emri}{" "}
                  {klienti.mbiemri}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowKlientiDeleteModal(false)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteKlienti()}
                >
                  Po, Fshij
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowKlientiDeleteModal(false)}
                >
                  Jo, Mbyll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminKlienti;
