import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000/";

const defaultPacket = {
  emri: "",
  pershkrimi: "",
  hapesira_gb: 0,
  bandwidth_gb: 0,
  nr_domaineve: 0,
  nr_emaileve: 0,
  ssl: true,
  cmimi_mujor: 0,
  cmimi_vjetor: 0,
  statusi: "",
};

function Paketa() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [packet, setPacket] = useState(defaultPacket);
  const [packetId, setPacketId] = useState(0);
  const [packets, setPackets] = useState([]);

  const emptyForm = {
    emri: "",
    pershkrimi: "",
    hapesira_gb: 0,
    bandwidth_gb: 0,
    nr_domaineve: 0,
    nr_emaileve: 0,
    ssl: true,
    cmimi_mujor: 0,
    cmimi_vjetor: 0,
    statusi: "aktiv",
  };

  const [form, setForm] = useState({
    emri: "",
    pershkrimi: "",
    hapesira_gb: 0,
    bandwidth_gb: 0,
    nr_domaineve: 0,
    nr_emaileve: 0,
    ssl: true,
    cmimi_mujor: 0,
    cmimi_vjetor: 0,
    statusi: "aktiv",
  });

  const getPackets = async () => {
    if (packets.length == 0) {
      await axios
        .get(BASE_URL + "paketa")
        .then(function (response) {
          setPackets(response.data);
        })
        .catch(function (error) {
          setPackets([]);
          setError(error);
        });
    } else {
      setPackets([]);
    }
  };

  const getPacket = async (e) => {
    e.preventDefault();
    const id = Number(packetId);
    await axios
      .get(BASE_URL + "paketa/" + id)
      .then(function (response) {
        setPacket(response.data);
      })
      .catch(function (error) {
        setPacket({ ...defaultPacket });
        setError(error);
      });
  };

  const postPacket = async (e) => {
    e.preventDefault();

    await axios
      .post(BASE_URL + "paketa", form)
      .then(function (response) {
        // Nuk po e printojm me responsin po po e update-ojm listen direkt
        setPackets([...packets, response.data]);
        setForm(emptyForm);
      })
      .catch(function (error) {
        setError(error);
      });
  };

  const updatePacket = async (e) => {
    e.preventDefault();
    if (packetId === 0) {
      setError("Selekto pakete");
    } else {
      await axios
        .put(BASE_URL + "paketa/" + packetId, packet)
        .then(function (response) {
          setPackets((prev) => prev.filter((p) => p.id !== packetId));
          setPackets([...packets, response.data]);
        })
        .catch(function (error) {
          setError(error);
        });
    }
  };

  const deletePacket = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(BASE_URL + "paketa/" + id);
      setPackets((prev) => prev.filter((p) => p.id !== id));
      setPacket((prev) => (prev.id === id ? {} : prev));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container mt-5">
      <button onClick={() => navigate("/")} className="btn btn-primary">
        Kthehu
      </button>
      <h1>Paketa CRUD</h1>

      <div className="row error">
        <h3 style={{ color: "red" }}>{error != "" ? "Error " + error : ""}</h3>
      </div>

      <div className="row">
        <div>
          <h3>Merr Te Gjith Paketat</h3>
          <button onClick={getPackets} className="btn btn-primary">
            Merr Te Gjith Paketat
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Emri</th>
              <th scope="col">Pershkrimi</th>
              <th scope="col">Hapesira( gb)</th>
              <th scope="col">Bandwidth( gb)</th>
              <th scope="col">Nr Domaineve</th>
              <th scope="col">Fshij?</th>
            </tr>
          </thead>
          <tbody>
            {packets.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.emri}</td>
                <td>{row.pershkrimi}</td>
                <td>{row.hapesira_gb}</td>
                <td>{row.bandwidth_gb}</td>
                <td>{row.nr_domaineve}</td>
                <td>
                  <button
                    onClick={(e) => deletePacket(e, row.id)}
                    className="btn btn-danger"
                  >
                    Fshij
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form onSubmit={getPacket}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID:
            </label>
            <input
              type="number"
              className="form-control"
              id="id"
              name="id"
              value={packetId}
              onChange={(e) => setPacketId(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Merr Paketen Specifike
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Emri</th>
              <th scope="col">Pershkrimi</th>
              <th scope="col">Hapesira( gb)</th>
              <th scope="col">Bandwidth( gb)</th>
              <th scope="col">Nr Domaineve</th>
            </tr>
          </thead>
          <tbody>
            <tr key={packet.id}>
              <td>{packet.id}</td>
              <td>{packet.emri}</td>
              <td>{packet.pershkrimi}</td>
              <td>{packet.hapesira_gb}</td>
              <td>{packet.bandwidth_gb}</td>
              <td>{packet.nr_domaineve}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <h3>Krijo Pakete</h3>

          <form onSubmit={postPacket}>
            <div className="mb-3">
              <label htmlFor="emri" className="form-label">
                Emri
              </label>
              <input
                type="text"
                name="emri"
                className="form-control"
                id="emri"
                value={form.emri}
                onChange={(e) => setForm({ ...form, emri: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pershkrimi" className="form-label">
                Pershkrimi
              </label>
              <textarea
                type="text"
                name="pershkrimi"
                className="form-control"
                id="pershkrimi"
                value={form.pershkrimi}
                onChange={(e) =>
                  setForm({ ...form, pershkrimi: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hapesira_gb" className="form-label">
                Hapesira ne GB
              </label>
              <input
                type="number"
                name="hapesira_gb"
                className="form-control"
                id="hapesira_gb"
                value={form.hapesira_gb}
                onChange={(e) =>
                  setForm({ ...form, hapesira_gb: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bandwidth_gb" className="form-label">
                Bandwidth ne GB
              </label>
              <input
                type="number"
                name="bandwidth_gb"
                className="form-control"
                id="bandwidth_gb"
                value={form.bandwidth_gb}
                onChange={(e) =>
                  setForm({ ...form, bandwidth_gb: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nr_domaineve" className="form-label">
                Numri i Domaineve
              </label>
              <input
                type="number"
                name="nr_domaineve"
                className="form-control"
                id="nr_domaineve"
                value={form.nr_domaineve}
                onChange={(e) =>
                  setForm({ ...form, nr_domaineve: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nr_emaileve" className="form-label">
                Numri i Email-ave
              </label>
              <input
                type="number"
                name="nr_emaileve"
                className="form-control"
                id="nr_emaileve"
                value={form.nr_emaileve}
                onChange={(e) =>
                  setForm({ ...form, nr_emaileve: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ssl" className="form-label">
                ssl
              </label>
              <select
                name="ssl"
                className="form-select"
                id="ssl-create"
                value={form.ssl ? "1" : "0"}
                onChange={(e) =>
                  setForm({ ...form, ssl: e.target.value === "1" })
                }
              >
                <option value="1">Po</option>
                <option value="0">Jo</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="statusi" className="form-label">
                Statusi
              </label>
              <select
                name="statusi"
                className="form-select"
                id="statusi"
                value={form.statusi}
                onChange={(e) => setForm({ ...form, statusi: e.target.value })}
              >
                <option value="aktiv">aktiv</option>
                <option value="jo-aktiv">jo-aktiv</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Krijo
            </button>
          </form>
        </div>

        <div className="col-12 cold-md-6 col-lg-5">
          <h3>Perditso Pakete</h3>
          <p>Fillimisht kerko pakete specifike nalt</p>
          <form onSubmit={updatePacket}>
            <div className="mb-3">
              <label htmlFor="emri" className="form-label">
                Emri
              </label>
              <input
                type="text"
                name="emri"
                className="form-control"
                id="emri"
                value={packet.emri}
                onChange={(e) => setPacket({ ...packet, emri: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pershkrimi" className="form-label">
                Pershkrimi
              </label>
              <textarea
                type="text"
                name="pershkrimi"
                className="form-control"
                id="pershkrimi"
                value={packet.pershkrimi}
                onChange={(e) =>
                  setPacket({ ...packet, pershkrimi: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hapesira_gb" className="form-label">
                Hapesira ne GB
              </label>
              <input
                type="number"
                name="hapesira_gb"
                className="form-control"
                id="hapesira_gb"
                value={packet.hapesira_gb}
                onChange={(e) =>
                  setPacket({ ...packet, hapesira_gb: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bandwidth_gb" className="form-label">
                Bandwidth ne GB
              </label>
              <input
                type="number"
                name="bandwidth_gb"
                className="form-control"
                id="bandwidth_gb"
                value={packet.bandwidth_gb}
                onChange={(e) =>
                  setPacket({ ...packet, bandwidth_gb: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nr_domaineve" className="form-label">
                Numri i Domaineve
              </label>
              <input
                type="number"
                name="nr_domaineve"
                className="form-control"
                id="nr_domaineve"
                value={packet.nr_domaineve}
                onChange={(e) =>
                  setPacket({ ...packet, nr_domaineve: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nr_emaileve" className="form-label">
                Numri i Email-ave
              </label>
              <input
                type="number"
                name="nr_emaileve"
                className="form-control"
                id="nr_emaileve"
                value={packet.nr_emaileve}
                onChange={(e) =>
                  setPacket({ ...packet, nr_emaileve: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ssl" className="form-label">
                ssl
              </label>
              <select
                name="ssl"
                className="form-select"
                id="ssl-update"
                value={packet.ssl ? "1" : "0"}
                onChange={(e) =>
                  setPacket({ ...packet, ssl: e.target.value === "1" })
                }
              >
                <option value="1">Po</option>
                <option value="0">Jo</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="statusi" className="form-label">
                Statusi
              </label>
              <select
                name="statusi"
                className="form-select"
                id="statusi"
                value={packet.statusi}
                onChange={(e) =>
                  setPacket({ ...packet, statusi: e.target.value })
                }
              >
                <option value="aktiv">aktiv</option>
                <option value="jo-aktiv">jo-aktiv</option>
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

export default Paketa;
