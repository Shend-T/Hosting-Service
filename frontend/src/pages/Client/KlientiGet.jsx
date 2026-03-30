import React, { useState } from "react";
import axios from "axios";

function KlientiGet() {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/klienti");
      setClients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Get All Klienti</h1>

      <button onClick={getClients} className="btn btn-success">
        Merr Te Gjihe Klientet
      </button>

      <div>
        {clients.map((client) => (
          <div key={client.id}>
            <p>Emri: {client.emri}</p>
            <p>Mbiemri: {client.mbiemri}</p>
            <p>Kompania: {client.kompania}</p>

            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default KlientiGet;
