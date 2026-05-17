import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:8000/api/";

function Faktura() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);

  const [faturat, setFaturat] = useState([]);
  const [selectedFaktura, setSelectedFaktura] = useState(null);
  const [view, setView] = useState("list"); // list | create | detail
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    abonimi_id: "",
    shuma: "",
    data_leshimit: "",
    data_skadimit: "",
    statusi: "papaguar",
    pershkrimi: "",
  });

  const headers = { Authorization: `Bearer ${token}` };

  // ✅ Fetch all faturat
  const getFaturat = async () => {
    try {
      const res = await axios.get(BASE_URL + "faturat", { headers });
      setFaturat(res.data);
    } catch (err) {
      setError("Gabim gjate marrjes se faturave.");
    }
  };

  // ✅ Fetch one faktura
  const getFaktura = async (id) => {
    try {
      const res = await axios.get(BASE_URL + "faturat/" + id, { headers });
      setSelectedFaktura(res.data);
      setView("detail");
    } catch (err) {
      setError("Gabim gjate marrjes se fatures.");
    }
  };

  // ✅ Create faktura
  const createFaktura = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL + "faturat", {
        ...form,
        klienti_id: Number(user.id),
        abonimi_id: Number(form.abonimi_id),
        shuma: Number(form.shuma),
      }, { headers });
      setSuccess("Faktura u krijua me sukses! Email u dergua.");
      setForm({
        abonimi_id: "",
        shuma: "",
        data_leshimit: "",
        data_skadimit: "",
        statusi: "papaguar",
        pershkrimi: "",
      });
      setView("list");
      getFaturat();
    } catch (err) {
      setError("Gabim gjate krijimit te fatures.");
    }
  };

  // ✅ Delete faktura
  const deleteFaktura = async (id) => {
    try {
      await axios.delete(BASE_URL + "faturat/" + id, { headers });
      setFaturat((prev) => prev.filter((f) => f.id !== id));
      setSuccess("Faktura u fshi me sukses!");
    } catch (err) {
      setError("Gabim gjate fshirjes se fatures.");
    }
  };

  useEffect(() => {
    getFaturat();
  }, []);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const t = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [success, error]);

  // ─── STATUS BADGE ───
  const statusiBadge = (s) => {
    const map = {
      paguar: "success",
      papaguar: "danger",
      anuluar: "secondary",
    };
    return <span className={`badge bg-${map[s] || "secondary"}`}>{s}</span>;
  };

  return (
    <div>
      {/* MESSAGES */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* ─── LIST VIEW ─── */}
      {view === "list" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Faturat</h3>
            <button
              className="btn btn-primary"
              onClick={() => setView("create")}
            >
              + Krijo Fature
            </button>
          </div>

          {faturat.length === 0 ? (
            <p className="text-muted">Nuk ke asnje fature.</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Abonimi ID</th>
                  <th>Shuma</th>
                  <th>Statusi</th>
                  <th>Data Leshimit</th>
                  <th>Data Skadimit</th>
                  <th>Veprimet</th>
                </tr>
              </thead>
              <tbody>
                {faturat.map((f) => (
                  <tr key={f.id}>
                    <td>#INV-{String(f.id).padStart(4, "0")}</td>
                    <td>#AB-{String(f.abonimi_id).padStart(5, "0")}</td>
                    <td>€{Number(f.shuma).toFixed(2)}</td>
                    <td>{statusiBadge(f.statusi)}</td>
                    <td>{f.data_leshimit?.slice(0, 10)}</td>
                    <td>{f.data_skadimit?.slice(0, 10) || "—"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => getFaktura(f.id)}
                      >
                        Shiko
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteFaktura(f.id)}
                      >
                        Fshij
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ─── CREATE VIEW ─── */}
      {view === "create" && (
        <div>
          <button
            className="btn btn-link ps-0 mb-3"
            onClick={() => setView("list")}
          >
            ← Kthehu
          </button>
          <h3>Krijo Fature te Re</h3>
          <form onSubmit={createFaktura}>
            <div className="mb-3">
              <label className="form-label">Abonimi ID</label>
              <input
                type="number"
                className="form-control"
                value={form.abonimi_id}
                onChange={(e) => setForm({ ...form, abonimi_id: e.target.value })}
                required
                min={1}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Shuma (€)</label>
              <input
                type="number"
                className="form-control"
                value={form.shuma}
                onChange={(e) => setForm({ ...form, shuma: e.target.value })}
                required
                min={0}
                step="0.01"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Data Leshimit</label>
              <input
                type="date"
                className="form-control"
                value={form.data_leshimit}
                onChange={(e) => setForm({ ...form, data_leshimit: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Data Skadimit</label>
              <input
                type="date"
                className="form-control"
                value={form.data_skadimit}
                onChange={(e) => setForm({ ...form, data_skadimit: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Statusi</label>
              <select
                className="form-select"
                value={form.statusi}
                onChange={(e) => setForm({ ...form, statusi: e.target.value })}
              >
                <option value="papaguar">E papaguar</option>
                <option value="paguar">E paguar</option>
                <option value="anuluar">E anuluar</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Pershkrimi</label>
              <textarea
                className="form-control"
                rows={3}
                value={form.pershkrimi}
                onChange={(e) => setForm({ ...form, pershkrimi: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Krijo Fature
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setView("list")}
            >
              Anulo
            </button>
          </form>
        </div>
      )}

      {/* ─── DETAIL VIEW ─── */}
      {view === "detail" && selectedFaktura && (
        <div>
          <button
            className="btn btn-link ps-0 mb-3"
            onClick={() => setView("list")}
          >
            ← Kthehu te Lista
          </button>

          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>#INV-{String(selectedFaktura.id).padStart(4, "0")}</h4>
                {statusiBadge(selectedFaktura.statusi)}
              </div>

              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Klienti ID</th>
                    <td>{selectedFaktura.klienti_id}</td>
                  </tr>
                  <tr>
                    <th>Abonimi ID</th>
                    <td>#AB-{String(selectedFaktura.abonimi_id).padStart(5, "0")}</td>
                  </tr>
                  <tr>
                    <th>Shuma</th>
                    <td>€{Number(selectedFaktura.shuma).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>TVSH (18%)</th>
                    <td>€{(Number(selectedFaktura.shuma) * 0.18).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>Totali</th>
                    <td><strong>€{(Number(selectedFaktura.shuma) * 1.18).toFixed(2)}</strong></td>
                  </tr>
                  <tr>
                    <th>Data Leshimit</th>
                    <td>{selectedFaktura.data_leshimit?.slice(0, 10)}</td>
                  </tr>
                  <tr>
                    <th>Data Skadimit</th>
                    <td>{selectedFaktura.data_skadimit?.slice(0, 10) || "—"}</td>
                  </tr>
                  <tr>
                    <th>Pershkrimi</th>
                    <td>{selectedFaktura.pershkrimi || "—"}</td>
                  </tr>
                </tbody>
              </table>

              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteFaktura(selectedFaktura.id);
                  setView("list");
                }}
              >
                Fshij Faturën
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faktura;