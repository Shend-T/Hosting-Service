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
    <div>
      <h1>Get All Klienti</h1>

      <button onClick={getClients}>Merr Te Gjihe Klientet</button>

      <ul>
        {clients.map((client) => (
          <div key={client.id}>
            <p>Emri: {client.emri}</p>
            <p>Mbiemri: {client.mbiemri}</p>
            <p>Kompania: {client.kompania}</p>

            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default KlientiGet;
