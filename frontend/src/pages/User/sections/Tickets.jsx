import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:8000/api/";

function Tickets() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);

  const [tiketa, setTiketa] = useState([]);
  const [selectedTiket, setSelectedTiket] = useState(null);
  const [view, setView] = useState("list"); // list | create | detail
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    titulli: "",
    pershkrimi: "",
    prioriteti: "normal",
    kategoria: "",
  });

  const [replyForm, setReplyForm] = useState({
    autori: "",
    mesazhi: "",
    pergjigja: "",
  });

  const headers = { Authorization: `Bearer ${token}` };

  // ✅ Fetch all tickets
  const getTiketa = async () => {
    try {
      const res = await axios.get(BASE_URL + "tiketa", { headers });
      setTiketa(res.data);
    } catch (err) {
      setError("Gabim gjate marrjes se tiketave.");
    }
  };

  // ✅ Fetch one ticket with replies
  const getTiket = async (id) => {
    try {
      const res = await axios.get(BASE_URL + "tiketa/" + id, { headers });
      setSelectedTiket(res.data);
      setView("detail");
    } catch (err) {
      setError("Gabim gjate marrjes se tiketit.");
    }
  };

  // ✅ Create ticket
  const createTiket = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL + "tiketa", {
        ...form,
        klienti_id: Number(user.id),
      }, { headers });
      setSuccess("Tiketi u krijua me sukses!");
      setForm({ titulli: "", pershkrimi: "", prioriteti: "normal", kategoria: "" });
      setView("list");
      getTiketa();
    } catch (err) {
      setError("Gabim gjate krijimit te tiketit.");
    }
  };

  // ✅ Delete ticket
  const deleteTiket = async (id) => {
    try {
      await axios.delete(BASE_URL + "tiketa/" + id, { headers });
      setTiketa((prev) => prev.filter((t) => t.id !== id));
      setSuccess("Tiketi u fshi me sukses!");
    } catch (err) {
      setError("Gabim gjate fshirjes se tiketit.");
    }
  };

  // ✅ Add reply
  const addReply = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "pergjigja_tiketi", {
        ...replyForm,
        tiketi_id: selectedTiket.id,
      }, { headers });
      setSelectedTiket((prev) => ({
        ...prev,
        pergjigjet: [...(prev.pergjigjet || []), res.data],
      }));
      setReplyForm({ autori: "", mesazhi: "", pergjigja: "" });
      setSuccess("Pergjigja u shtua!");
    } catch (err) {
      setError("Gabim gjate shtimit te pergjigjes.");
    }
  };

  // ✅ Delete reply
  const deleteReply = async (id) => {
    try {
      await axios.delete(BASE_URL + "pergjigja_tiketi/" + id, { headers });
      setSelectedTiket((prev) => ({
        ...prev,
        pergjigjet: prev.pergjigjet.filter((p) => p.id !== id),
      }));
      setSuccess("Pergjigja u fshi!");
    } catch (err) {
      setError("Gabim gjate fshirjes se pergjigjes.");
    }
  };

  useEffect(() => {
    getTiketa();
  }, []);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const t = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [success, error]);

  // ─── PRIORITY BADGE ───
  const prioritetiBadge = (p) => {
    const map = {
      i_ulet: "secondary",
      normal: "primary",
      i_larte: "warning",
      urgjent: "danger",
    };
    return <span className={`badge bg-${map[p] || "primary"}`}>{p}</span>;
  };

  // ─── STATUS BADGE ───
  const statusiBadge = (s) => {
    const map = {
      hapur: "success",
      ne_proces: "warning",
      mbyllur: "secondary",
    };
    return <span className={`badge bg-${map[s] || "secondary"}`}>{s}</span>;
  };
  console.log("user state:", user);
  return (
    <div>
      {/* MESSAGES */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* ─── LIST VIEW ─── */}
      {view === "list" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Kerkesat (Tiketat)</h3>
            <button className="btn btn-primary" onClick={() => setView("create")}>
              + Hap Tiket te Ri
            </button>
          </div>

          {tiketa.length === 0 ? (
            <p className="text-muted">Nuk ke asnje tiket te hapur.</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titulli</th>
                  <th>Kategoria</th>
                  <th>Prioriteti</th>
                  <th>Statusi</th>
                  <th>Data</th>
                  <th>Veprimet</th>
                </tr>
              </thead>
              <tbody>
                {tiketa.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.titulli}</td>
                    <td>{t.kategoria}</td>
                    <td>{prioritetiBadge(t.prioriteti)}</td>
                    <td>{statusiBadge(t.statusi)}</td>
                    <td>{t.data_hapjes?.slice(0, 10)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => getTiket(t.id)}
                      >
                        Shiko
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteTiket(t.id)}
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
          <button className="btn btn-link ps-0 mb-3" onClick={() => setView("list")}>
            ← Kthehu
          </button>
          <h3>Hap Tiket te Ri</h3>
          <form onSubmit={createTiket}>
            <div className="mb-3">
              <label className="form-label">Titulli</label>
              <input
                type="text"
                className="form-control"
                value={form.titulli}
                onChange={(e) => setForm({ ...form, titulli: e.target.value })}
                required
                maxLength={255}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pershkrimi</label>
              <textarea
                className="form-control"
                rows={4}
                value={form.pershkrimi}
                onChange={(e) => setForm({ ...form, pershkrimi: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Prioriteti</label>
              <select
                className="form-select"
                value={form.prioriteti}
                onChange={(e) => setForm({ ...form, prioriteti: e.target.value })}
              >
                <option value="i_ulet">I ulet</option>
                <option value="normal">Normal</option>
                <option value="i_larte">I larte</option>
                <option value="urgjent">Urgjent</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Kategoria</label>
              <input
                type="text"
                className="form-control"
                value={form.kategoria}
                onChange={(e) => setForm({ ...form, kategoria: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Krijo Tiketin</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setView("list")}>
              Anulo
            </button>
          </form>
        </div>
      )}

      {/* ─── DETAIL VIEW ─── */}
      {view === "detail" && selectedTiket && (
        <div>
          <button className="btn btn-link ps-0 mb-3" onClick={() => setView("list")}>
            ← Kthehu te Lista
          </button>

          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{selectedTiket.titulli}</h4>
                <div>
                  {prioritetiBadge(selectedTiket.prioriteti)}
                  <span className="ms-2">{statusiBadge(selectedTiket.statusi)}</span>
                </div>
              </div>
              <p className="text-muted mt-2">{selectedTiket.pershkrimi}</p>
              <small className="text-muted">
                Kategoria: {selectedTiket.kategoria} · Hapur: {selectedTiket.data_hapjes?.slice(0, 10)}
              </small>
            </div>
          </div>

          {/* REPLIES */}
          <h5>Pergjigjet</h5>
          {(!selectedTiket.pergjigjet || selectedTiket.pergjigjet.length === 0) ? (
            <p className="text-muted">Nuk ka pergjigje akoma.</p>
          ) : (
            selectedTiket.pergjigjet.map((p) => (
              <div key={p.id} className="card mb-2">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <strong>{p.autori}</strong>
                    <small className="text-muted">{p.data_hapjes?.slice(0, 10)}</small>
                  </div>
                  <p className="mb-1 mt-1">{p.pergjigja}</p>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteReply(p.id)}
                  >
                    Fshij
                  </button>
                </div>
              </div>
            ))
          )}

          {/* ADD REPLY */}
          <div className="card mt-4">
            <div className="card-body">
              <h6>Shto Pergjigje</h6>
              <form onSubmit={addReply}>
                <div className="mb-3">
                  <label className="form-label">Autori</label>
                  <input
                    type="text"
                    className="form-control"
                    value={replyForm.autori}
                    onChange={(e) => setReplyForm({ ...replyForm, autori: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mesazhi</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={replyForm.mesazhi}
                    onChange={(e) => setReplyForm({ ...replyForm, mesazhi: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pergjigja</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={replyForm.pergjigja}
                    onChange={(e) => setReplyForm({ ...replyForm, pergjigja: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Dergo Pergjigjen</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tickets;