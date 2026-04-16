import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

function Services() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [packets, setPackets] = useState([]);
  const [selectedPacket, setSelectedPacket] = useState(null);

  useEffect(() => {
    const getFirstThreePackets = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/paketa-3");
        res.data.forEach((p) => {
          p.pershkrimi = p.pershkrimi.split("\n");
        });

        setPackets(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFirstThreePackets();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPacket(null);
      }
    };

    if (selectedPacket) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPacket]);

  const [periudha, setPeriudha] = useState("mujore");
  const [autoRinovim, setAutoRinovim] = useState(true);

  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.auth.token);
  // const formatDateForBackend = (date) => {
  //   return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
  // };

  const buyPacket = async () => {
    const form = {
      klienti_id: Number(userId),
      paketa_id: selectedPacket.id,
      data_fillimit: new Date().toISOString().slice(0, 10),
      data_skadimit:
        periudha === "mujore"
          ? new Date(new Date().setMonth(new Date().getMonth() + 1))
              .toISOString()
              .slice(0, 10)
          : new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .slice(0, 10),
      cmimi:
        periudha === "mujore"
          ? Number(selectedPacket.cmimi_mujor)
          : Number(selectedPacket.cmimi_vjetor),
      periudha: periudha,
      auto_rinovim: autoRinovim,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/abonimi/user",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    // console.log(form);
  };

  return (
    <div className="container mb-5 pb-5" style={{ paddingTop: "15vh" }}>
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1>Keto Jane Te Gjitha Planet Qe Ne I Ofrojme Momentalisht</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
          blanditiis dolorem. Quaerat, adipisci assumenda repellendus quod,
          illum sunt reprehenderit, reiciendis aliquam voluptas alias temporibus
          voluptatum? At, iste voluptas. Illo labore obcaecati ab aut voluptas
          repudiandae, odio cumque optio eius sint.
        </p>
      </div>

      <div className="container mb-5">
        <div className="card-deck text-center my-5 py-5">
          <div style={{ fontSize: "14px", marginBottom: "1rem" }}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="radio_mujore"
                value="mujore"
                onChange={(e) => setPeriudha(e.target.value)}
                checked={periudha === "mujore"}
              />
              <label className="form-check-label" htmlFor="radio_mujore">
                Planet Mujore
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="radio_vjetore"
                value="vjetore"
                onChange={(e) => setPeriudha(e.target.value)}
                checked={periudha === "vjetore"}
              />
              <label className="form-check-label" htmlFor="radio_vjetore">
                Planet Vjetore
              </label>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            {packets.map((packet) => (
              <div className="col-md-4 col-sm-8 mb-3" key={packet.id}>
                <div className="card shadow py-3 ">
                  <div className="card-body">
                    <h2 className="card-title">{packet.emri}</h2>
                    <p className="card-text lead">{packet.pershkrimi[0]}</p>
                    <p className="card-text lead">
                      {periudha === "mujore" ? (
                        <b>€{packet.cmimi_mujor} / muaj</b>
                      ) : (
                        <b>€{packet.cmimi_vjetor} / vjet</b>
                      )}
                    </p>

                    <p className="card-text lead">{packet.pershkrimi[1]}</p>
                    <div className="text-start px-5">
                      <p className="lead">{packet.pershkrimi[2]}</p>
                      <p className="lead">{packet.pershkrimi[3]}</p>
                      <p className="lead">{packet.pershkrimi[4]}</p>
                      <p className="lead">{packet.pershkrimi[5]}</p>
                      <p className="lead">{packet.pershkrimi[6]}</p>
                      <p className="lead">{packet.pershkrimi[7]}</p>
                    </div>

                    <button
                      onClick={() => setSelectedPacket(packet)}
                      className="btn btn-outline-primary"
                    >
                      Fillo Me Kete Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedPacket ? (
        isAuthenticated ? (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setSelectedPacket(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Deshironi te bleni Planin <b>{selectedPacket.emri}</b>
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedPacket(null)}
                  />
                </div>

                <div className="model-body px-5 py-3">
                  <p className="lead">Ky Plan Perfshine</p>
                  <div className="text-start px-5">
                    <p className="lead">{selectedPacket.pershkrimi[2]}</p>
                    <p className="lead">{selectedPacket.pershkrimi[3]}</p>
                    <p className="lead">{selectedPacket.pershkrimi[4]}</p>
                    <p className="lead">{selectedPacket.pershkrimi[5]}</p>
                    <p className="lead">{selectedPacket.pershkrimi[6]}</p>
                    <p className="lead">{selectedPacket.pershkrimi[7]}</p>
                  </div>

                  <p className="lead">
                    Dhe kushton:{" "}
                    {periudha === "mujore" ? (
                      <b>€{selectedPacket.cmimi_mujor} / muaj</b>
                    ) : (
                      <b>€{selectedPacket.cmimi_vjetor} / vjet</b>
                    )}
                  </p>

                  <p className="lead">
                    Deshironi rinovim te abonimit automatikisht?
                  </p>
                  <select
                    className="form-select"
                    defaultValue={autoRinovim}
                    onChange={(e) => setAutoRinovim(e.target.value === "true")}
                  >
                    <option value={true}>Po</option>
                    <option value={false}>Jo</option>
                  </select>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedPacket(null)}
                  >
                    Kthehu
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => buyPacket()}
                  >
                    Blej
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Log In FIrst</h1>
        )
      ) : null}
    </div>
  );
}

export default Services;
