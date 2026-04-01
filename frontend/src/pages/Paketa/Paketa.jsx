import React, { useState } from "react";
import axios from "axios";

function Paketa() {
  const baseURL = "http://localhost:8000/";
  const [error, setError] = useState("");

  const [packet, setPacket] = useState({});
  const [packetId, setPacketId] = useState(0);
  const [packets, setPackets] = useState([]);

  const getPackets = async () => {
    if (packets.length == 0) {
      await axios
        .get(baseURL + "paketa")
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
      .get(baseURL + "paketa/" + id)
      .then(function (response) {
        setPacket(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setPacket({});
        setError(error);
      });
  };

  const deletePacket = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(baseURL + "paketa/" + id);
      setPackets((prev) => prev.filter((p) => p.id !== id));
      setPacket((prev) => (prev.id === id ? {} : prev));
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <div className="container mt-5">
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
            {packets.map((packet) => (
              <tr key={packet.id}>
                <td>{packet.id}</td>
                <td>{packet.emri}</td>
                <td>{packet.pershkrimi}</td>
                <td>{packet.hapesira_gb}</td>
                <td>{packet.bandwidth_gb}</td>
                <td>{packet.nr_domaineve}</td>
                <td>
                  <button
                    onClick={(e) => deletePacket(e, packet.id)}
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
    </div>
  );
}

export default Paketa;
