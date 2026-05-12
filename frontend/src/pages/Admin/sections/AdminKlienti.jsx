import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

function AdminKlienti() {
  const URL = "http://127.0.0.1:8000/api/admin/klienti";

  const adminToken = useSelector((state) => state.admin.token);

  const [klientet, setKlientet] = useState([]);
  useEffect(() => {
    const getKlientet = async () => {
      try {
        console.log(adminToken);
        const res = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        setKlientet(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getKlientet();
  }, []);
  return (
    <div>
      <h1>Klientet</h1>

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
                <td>{klienti.statusi}</td>
                <td>{klienti.data_regjistrimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nuk ka klient aktiv momentalisht</p>
      )}
    </div>
  );
}

export default AdminKlienti;
