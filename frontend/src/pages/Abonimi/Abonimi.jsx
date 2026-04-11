import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

// === Konstantet ===
const BASE_URL = "http://localhost:8000/api/";

const defaultAbonim = {
  klienti_id: 0,
  paketa_id: 0,
  data_fillimit: "",
  data_skadimit: "",
  statusi: "",
  cmimi: 0,
  periudha: "",
  auto_rinovim: true,
};

function formatDateForInput(value) {
  if (value == null || value === "") return "";
  return String(value).slice(0, 10);
}

function Abonimi() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [abonim, setAbonim] = useState(defaultAbonim);
  const [abonimId, setAbonimId] = useState(0);
  const [abonimet, setAbonimet] = useState([]);

  const emptyForm = {
    klienti_id: 0,
    paketa_id: 0,
    data_fillimit: "",
    data_skadimit: "",
    statusi: "pritje",
    cmimi: 0,
    periudha: "mujore",
    auto_rinovim: true,
  };

  const [form, setForm] = useState({
    klienti_id: 0,
    paketa_id: 0,
    data_fillimit: "",
    data_skadimit: "",
    statusi: "pritje",
    cmimi: 0,
    periudha: "mujore",
    auto_rinovim: true,
  });

  const getAbonimet = async () => {
    if (abonimet.length == 0) {
      await axios
        .get(BASE_URL + "abonimi")
        .then(function (response) {
          setAbonimet(response.data);
        })
        .catch(function (err) {
          setAbonimet([]);
          setError(err);
        });
    } else {
      setAbonimet([]);
    }
  };

  const getAbonim = async (e) => {
    e.preventDefault();
    const id = Number(abonimId);
    await axios
      .get(BASE_URL + "abonimi/" + id)
      .then(function (response) {
        const d = response.data;
        setAbonim({
          ...d,
          data_fillimit: formatDateForInput(d.data_fillimit),
          data_skadimit: formatDateForInput(d.data_skadimit),
          cmimi: Number(d.cmimi),
        });
      })
      .catch(function (err) {
        setAbonim({ ...defaultAbonim });
        setError(err);
      });
  };

  const postAbonim = async (e) => {
    e.preventDefault();
    const payload = {
      klienti_id: Number(form.klienti_id),
      paketa_id: Number(form.paketa_id),
      data_fillimit: form.data_fillimit,
      data_skadimit: form.data_skadimit,
      statusi: form.statusi,
      cmimi: Number(form.cmimi),
      periudha: form.periudha,
      auto_rinovim: form.auto_rinovim,
    };
    await axios
      .post(BASE_URL + "abonimi", payload)
      .then(function (response) {
        const d = response.data;
        setAbonimet([
          ...abonimet,
          {
            ...d,
            data_fillimit: formatDateForInput(d.data_fillimit),
            data_skadimit: formatDateForInput(d.data_skadimit),
          },
        ]);
        setForm(emptyForm);
      })
      .catch(function (err) {
        setError(err);
      });
  };

  const updateAbonim = async (e) => {
    e.preventDefault();
    if (abonimId === 0) {
      setError("Selekto abonim");
    } else {
      const payload = {
        klienti_id: Number(abonim.klienti_id),
        paketa_id: Number(abonim.paketa_id),
        data_fillimit: abonim.data_fillimit,
        data_skadimit: abonim.data_skadimit,
        statusi: abonim.statusi,
        cmimi: Number(abonim.cmimi),
        periudha: abonim.periudha,
        auto_rinovim: abonim.auto_rinovim,
      };
      await axios
        .put(BASE_URL + "abonimi/" + abonimId, payload)
        .then(function (response) {
          const d = response.data;
          const row = {
            ...d,
            data_fillimit: formatDateForInput(d.data_fillimit),
            data_skadimit: formatDateForInput(d.data_skadimit),
          };
          setAbonimet((prev) => prev.filter((a) => a.id !== abonimId));
          setAbonimet([...abonimet, row]);
          setAbonim({
            ...d,
            data_fillimit: formatDateForInput(d.data_fillimit),
            data_skadimit: formatDateForInput(d.data_skadimit),
            cmimi: Number(d.cmimi),
          });
        })
        .catch(function (err) {
          setError(err);
        });
    }
  };

  const deleteAbonim = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(BASE_URL + "abonimi/" + id);
      setAbonimet((prev) => prev.filter((a) => a.id !== id));
      setAbonim((prev) => (prev.id === id ? { ...defaultAbonim } : prev));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container mt-5">
      <button onClick={() => navigate("/")} className="btn btn-primary">
        Kthehu
      </button>
      <h1>Abonimi CRUD</h1>

      <div className="row error">
        <h3 style={{ color: "red" }}>{error != "" ? "Error " + error : ""}</h3>
      </div>

      <div className="row">
        <div>
          <h3>Merr Te Gjith Abonimet</h3>
          <button onClick={getAbonimet} className="btn btn-primary">
            Merr Te Gjith Abonimet
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Klienti ID</th>
              <th scope="col">Paketa ID</th>
              <th scope="col">Data fillimit</th>
              <th scope="col">Data skadimit</th>
              <th scope="col">Statusi</th>
              <th scope="col">Fshij?</th>
            </tr>
          </thead>
          <tbody>
            {abonimet.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.klienti_id}</td>
                <td>{row.paketa_id}</td>
                <td>{formatDateForInput(row.data_fillimit)}</td>
                <td>{formatDateForInput(row.data_skadimit)}</td>
                <td>{row.statusi}</td>
                <td>
                  <button
                    onClick={(e) => deleteAbonim(e, row.id)}
                    className="btn btn-danger"
                  >
                    Fshij
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form onSubmit={getAbonim}>
          <div className="mb-3">
            <label htmlFor="abonim-lookup-id" className="form-label">
              ID:
            </label>
            <input
              type="number"
              className="form-control"
              id="abonim-lookup-id"
              name="id"
              value={abonimId}
              onChange={(e) => setAbonimId(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Merr Abonimin Specifik
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Klienti ID</th>
              <th scope="col">Paketa ID</th>
              <th scope="col">Data fillimit</th>
              <th scope="col">Data skadimit</th>
              <th scope="col">Statusi</th>
              <th scope="col">Cmimi</th>
              <th scope="col">Periudha</th>
              <th scope="col">Auto rinovim</th>
            </tr>
          </thead>
          <tbody>
            <tr key={abonim.id ?? "empty"}>
              <td>{abonim.id}</td>
              <td>{abonim.klienti_id}</td>
              <td>{abonim.paketa_id}</td>
              <td>{abonim.data_fillimit}</td>
              <td>{abonim.data_skadimit}</td>
              <td>{abonim.statusi}</td>
              <td>{abonim.cmimi}</td>
              <td>{abonim.periudha}</td>
              <td>{abonim.auto_rinovim ? "Po" : "Jo"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <h3>Krijo Abonim</h3>

          <form onSubmit={postAbonim}>
            <div className="mb-3">
              <label htmlFor="create-klienti_id" className="form-label">
                Klienti ID
              </label>
              <input
                type="number"
                name="klienti_id"
                className="form-control"
                id="create-klienti_id"
                value={form.klienti_id || ""}
                onChange={(e) =>
                  setForm({ ...form, klienti_id: Number(e.target.value) })
                }
                required
                min={1}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-paketa_id" className="form-label">
                Paketa ID
              </label>
              <input
                type="number"
                name="paketa_id"
                className="form-control"
                id="create-paketa_id"
                value={form.paketa_id || ""}
                onChange={(e) =>
                  setForm({ ...form, paketa_id: Number(e.target.value) })
                }
                required
                min={1}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-data_fillimit" className="form-label">
                Data fillimit
              </label>
              <input
                type="date"
                name="data_fillimit"
                className="form-control"
                id="create-data_fillimit"
                value={form.data_fillimit}
                onChange={(e) =>
                  setForm({ ...form, data_fillimit: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-data_skadimit" className="form-label">
                Data skadimit
              </label>
              <input
                type="date"
                name="data_skadimit"
                className="form-control"
                id="create-data_skadimit"
                value={form.data_skadimit}
                onChange={(e) =>
                  setForm({ ...form, data_skadimit: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-statusi" className="form-label">
                Statusi
              </label>
              <select
                name="statusi"
                className="form-select"
                id="create-statusi"
                value={form.statusi}
                onChange={(e) => setForm({ ...form, statusi: e.target.value })}
              >
                <option value="pritje">pritje</option>
                <option value="aktiv">aktiv</option>
                <option value="suspenduar">suspenduar</option>
                <option value="skaduar">skaduar</option>
                <option value="ndalur">ndalur</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="create-cmimi" className="form-label">
                Cmimi
              </label>
              <input
                type="number"
                name="cmimi"
                className="form-control"
                id="create-cmimi"
                value={form.cmimi}
                onChange={(e) =>
                  setForm({ ...form, cmimi: Number(e.target.value) })
                }
                min={0}
                step="0.01"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-periudha" className="form-label">
                Periudha
              </label>
              <select
                name="periudha"
                className="form-select"
                id="create-periudha"
                value={form.periudha}
                onChange={(e) => setForm({ ...form, periudha: e.target.value })}
                required
              >
                <option value="mujore">mujore</option>
                <option value="vjetore">vjetore</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="create-auto_rinovim" className="form-label">
                Auto rinovim
              </label>
              <select
                name="auto_rinovim"
                className="form-select"
                id="create-auto_rinovim"
                value={form.auto_rinovim ? "1" : "0"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    auto_rinovim: e.target.value === "1",
                  })
                }
              >
                <option value="1">Po</option>
                <option value="0">Jo</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Krijo
            </button>
          </form>
        </div>

        <div className="col-12 col-md-6 col-lg-5">
          <h3>Perditso Abonim</h3>
          <p>Fillimisht kerko abonim specifik me ID me lart</p>
          <form onSubmit={updateAbonim}>
            <div className="mb-3">
              <label htmlFor="update-klienti_id" className="form-label">
                Klienti ID
              </label>
              <input
                type="number"
                name="klienti_id"
                className="form-control"
                id="update-klienti_id"
                value={abonim.klienti_id || ""}
                onChange={(e) =>
                  setAbonim({
                    ...abonim,
                    klienti_id: Number(e.target.value),
                  })
                }
                required
                min={1}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="update-paketa_id" className="form-label">
                Paketa ID
              </label>
              <input
                type="number"
                name="paketa_id"
                className="form-control"
                id="update-paketa_id"
                value={abonim.paketa_id || ""}
                onChange={(e) =>
                  setAbonim({
                    ...abonim,
                    paketa_id: Number(e.target.value),
                  })
                }
                required
                min={1}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="update-data_fillimit" className="form-label">
                Data fillimit
              </label>
              <input
                type="date"
                name="data_fillimit"
                className="form-control"
                id="update-data_fillimit"
                value={abonim.data_fillimit}
                onChange={(e) =>
                  setAbonim({ ...abonim, data_fillimit: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="update-data_skadimit" className="form-label">
                Data skadimit
              </label>
              <input
                type="date"
                name="data_skadimit"
                className="form-control"
                id="update-data_skadimit"
                value={abonim.data_skadimit}
                onChange={(e) =>
                  setAbonim({ ...abonim, data_skadimit: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="update-statusi" className="form-label">
                Statusi
              </label>
              <select
                name="statusi"
                className="form-select"
                id="update-statusi"
                value={abonim.statusi || "pritje"}
                onChange={(e) =>
                  setAbonim({ ...abonim, statusi: e.target.value })
                }
              >
                <option value="pritje">pritje</option>
                <option value="aktiv">aktiv</option>
                <option value="suspenduar">suspenduar</option>
                <option value="skaduar">skaduar</option>
                <option value="ndalur">ndalur</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="update-cmimi" className="form-label">
                Cmimi
              </label>
              <input
                type="number"
                name="cmimi"
                className="form-control"
                id="update-cmimi"
                value={abonim.cmimi}
                onChange={(e) =>
                  setAbonim({ ...abonim, cmimi: Number(e.target.value) })
                }
                min={0}
                step="0.01"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="update-periudha" className="form-label">
                Periudha
              </label>
              <select
                name="periudha"
                className="form-select"
                id="update-periudha"
                value={abonim.periudha || "mujore"}
                onChange={(e) =>
                  setAbonim({ ...abonim, periudha: e.target.value })
                }
                required
              >
                <option value="mujore">mujore</option>
                <option value="vjetore">vjetore</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="update-auto_rinovim" className="form-label">
                Auto rinovim
              </label>
              <select
                name="auto_rinovim"
                className="form-select"
                id="update-auto_rinovim"
                value={abonim.auto_rinovim ? "1" : "0"}
                onChange={(e) =>
                  setAbonim({
                    ...abonim,
                    auto_rinovim: e.target.value === "1",
                  })
                }
              >
                <option value="1">Po</option>
                <option value="0">Jo</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Perditso
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Abonimi;
