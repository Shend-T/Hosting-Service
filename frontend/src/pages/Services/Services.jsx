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
                  <h5 className="modal-title">Lorem Ipsum</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedPacket(null)}
                  />
                </div>

                <div className="model-body">
                  <p className="lead">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dolorem eos consectetur sit placeat, quam debitis! Rerum
                    debitis tenetur officia distinctio.
                  </p>
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
