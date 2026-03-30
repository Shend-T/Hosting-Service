import React, { useState } from "react";
import axios from "axios";

function Client() {
  const baseURL = "http://localhost:8000/";
  const [clients, setClients] = useState([]);

  const [error, setError] = useState();

  const [form, setForm] = useState({
    emri: "",
    mbiemri: "",
    kompania: "",
    email: "",
    telefoni: "",
    adresa: "",
    statusi: "aktiv",
    bilanci: 0,
  });

  const [updateId, setUpdateId] = useState(0);
  const [updateForm, setUpdateForm] = useState({
    emri: "",
    mbiemri: "",
    kompania: "",
    email: "",
    telefoni: "",
    adresa: "",
    statusi: "aktiv",
    bilanci: 0,
  });

  const getClients = async () => {
    if (clients.length == 0) {
      try {
        const response = await axios.get(baseURL + "klienti");
        setClients(response.data);
      } catch (error) {
        setError(error);
      }
    } else {
      setClients([]);
    }
  };

  const postClient = async (e) => {
    e.preventDefault(); // Mos me u refresh web-i
    await axios
      .post(baseURL + "klienti", form)
      .then(function (response) {
        console.log(response);
        console.log(response.data); // Printo responsin
      })
      .catch(function (error) {
        console.log(error); // Nese ka error
      });
  };

  const getUpdateClient = async (e) => {
    e.preventDefault();
    if (updateId != 0) {
      try {
        const response = await axios.get(baseURL + "klienti/" + updateId);
        setUpdateId(response.data.id);
        setUpdateForm({
          emri: response.data.emri,
          mbiemri: response.data.mbiemri,
          kompania: response.data.kompania,
          email: response.data.email,
          telefoni: response.data.telefoni,
          adresa: response.data.adresa,
          statusi: response.data.statusi,
          bilanci: Number(response.data.bilanci),
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateClient = async (e) => {
    e.preventDefault();
    console.log(baseURL + "klienti/" + updateId);
    if (updateId != 0) {
      await axios
        .put(baseURL + "klienti/" + updateId, updateForm)
        .then(function (response) {
          console.log(response);
          console.log(response.data); // Printo responsin
        })
        .catch(function (error) {
          console.log(error); // Nese ka error
        });
    } else {
      console.log("Error me ID");
    }
  };

  const deleteClient = async (e, id) => {
    e.preventDefault();
    await axios
      .delete(baseURL + "klienti/" + id)
      .then(function (response) {
        alert(response);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Klienti CRUD</h1>

      <div className="error">
        <h3 style={{ color: "red" }}>
          {error ? "Ka pasur error: " : ""} {error}
        </h3>
      </div>

      {/* ========== Get All Klienti ========== */}
      <div className="row" style={{ margin: "5vh 0" }}>
        <div>
          <h3>Merr Te Gjith Klientet</h3>
          <button onClick={getClients}>Merr Te Gjihe Klientet</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Emri</th>
              <th scope="col">Mbiemri</th>
              <th scope="col">Kompania</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Bilanci</th>
              <th scope="col">Fshij?</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <th scope="row">{client.id}</th>
                <td>{client.emri}</td>
                <td>{client.mbiemri}</td>
                <td>{client.kompania}</td>
                <td>{client.email}</td>
                <td>{client.bilanci}</td>
                <td>
                  <button
                    onClick={(e) => deleteClient(e, client.id)}
                    className="btn btn-danger"
                  >
                    Fshij
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row justify-content-start">
        {/* ========== Create Klienti ========== */}
        <div className="col-12 col-md-6 col-lg-5">
          <h3>Krijo Klient</h3>

          <form onSubmit={postClient}>
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
              <label htmlFor="mbiemri" className="form-label">
                Mbiemri
              </label>
              <input
                type="text"
                name="mbiemri"
                className="form-control"
                id="mbiemri"
                value={form.mbiemri}
                onChange={(e) => setForm({ ...form, mbiemri: e.target.value })}
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
                value={form.kompania}
                onChange={(e) => setForm({ ...form, kompania: e.target.value })}
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
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                value={form.telefoni}
                onChange={(e) => setForm({ ...form, telefoni: e.target.value })}
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
                value={form.adresa}
                onChange={(e) => setForm({ ...form, adresa: e.target.value })}
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
                value={form.statusi}
                onChange={(e) => setForm({ ...form, statusi: e.target.value })}
              >
                <option value="aktiv">aktiv</option>
                <option value="jo-aktiv">jo-aktiv</option>
                <option value="suspenduar">suspenduar</option>
              </select>
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
                value={form.bilanci}
                onChange={(e) =>
                  setForm({ ...form, bilanci: Number(e.target.value) })
                }
                min={0}
                step="0.01"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Krijo
            </button>
          </form>
        </div>

        {/* ========== Update Klienti ========== */}
        <div className="col-12 col-md-6 col-lg-5">
          <h3>Perditso Nje Klient</h3>
          {/* Fillimisht merr klientin qe don me perditsu */}
          <form onSubmit={getUpdateClient}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label"></label>
              <input
                type="number"
                name="id"
                id="id"
                value={updateId}
                onChange={(e) => setUpdateId(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Merr Klientin Ne Fjale
            </button>
          </form>

          {/* Tash mundesh me perditsu ( Update) */}
          <form onSubmit={updateClient}>
            <div className="mb-3">
              <label htmlFor="emri" className="form-label">
                Emri
              </label>
              <input
                type="text"
                name="emri"
                className="form-control"
                id="emri"
                value={updateForm.emri}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, emri: e.target.value })
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
                value={updateForm.mbiemri}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, mbiemri: e.target.value })
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
                value={updateForm.kompania}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, kompania: e.target.value })
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
                value={updateForm.email}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, email: e.target.value })
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
                value={updateForm.telefoni}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, telefoni: e.target.value })
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
                value={updateForm.adresa}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, adresa: e.target.value })
                }
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
                value={updateForm.statusi}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, statusi: e.target.value })
                }
              >
                <option value="aktiv">aktiv</option>
                <option value="jo-aktiv">jo-aktiv</option>
                <option value="suspenduar">suspenduar</option>
              </select>
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
                value={updateForm.bilanci}
                onChange={(e) =>
                  setUpdateForm({
                    ...updateForm,
                    bilanci: Number(e.target.value),
                  })
                }
                min={0}
                step="0.01"
                required
              />
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

export default Client;
