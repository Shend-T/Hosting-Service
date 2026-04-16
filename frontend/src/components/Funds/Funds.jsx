import React, { useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setFunds } from "../../features/user/userSlice";

function Funds({ isOpen, onClose }) {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [cardType, setCardType] = useState("debit_kartele");
  const [amount, setAmount] = useState(0);

  const handleSubmit = async () => {
    if (Number(amount) > 0.0) {
      try {
        const res = await axios.patch(
          "http://127.0.0.1:8000/api/klienti/add-funds",
          { id: userId, funds: Number(amount) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        dispatch(setFunds(res.data.bilanci));
        alert(res.data.message);

        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Shto Fonde</h3>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body" style={{ fontSize: "14px" }}>
            <p className="lead">Zgjedh llojin e karteles bankare</p>
            <div className="form-check" style={{ fontSize: "12px" }}>
              <input
                className="form-check-input"
                type="radio"
                name="options"
                id="debit_kartele"
                value="debit_kartele"
                onChange={(e) => setCardType(e.target.value)}
                checked={cardType === "debit_kartele"}
              />
              <label className="form-check-label" htmlFor="debit_kartele">
                Debit Kartele
              </label>
            </div>
            <div className="form-check" style={{ fontSize: "12px" }}>
              <input
                className="form-check-input"
                type="radio"
                name="options"
                id="kredit_kartele"
                value="kredit_kartele"
                onChange={(e) => setCardType(e.target.value)}
                checked={cardType === "kredit_kartele"}
              />
              <label className="form-check-label" htmlFor="kredit_kartele">
                Kredit Kartele
              </label>
            </div>

            <p className="lead">Shkruaj te dhenat e karteles</p>
            <div className="mt-3" style={{ fontSize: "12px" }}>
              <label htmlFor="name_on_card">Emri Ne Kartele</label>
              <input
                className="form-control"
                type="text"
                name="name_on_card"
                id="name_on_card"
                placeholder="Filan..."
              />
            </div>
            <div className="mt-3" style={{ fontSize: "12px" }}>
              <label htmlFor="card_numbers">Numrat E Karteles</label>
              <input
                className="form-control"
                type="text"
                name="card_numbers"
                id="card_numbers"
                placeholder="Filan..."
              />
            </div>
            <div className="mt-3" style={{ fontSize: "12px" }}>
              <label htmlFor="cvv">CVV</label>
              <input
                className="form-control"
                type="text"
                name="cvv"
                id="cvv"
                placeholder="Filan..."
              />
            </div>

            <div className="mt-3 mb-3">
              <label htmlFor="funds">Zgjedh Shumen</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                name="funds"
                id="funds"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Kthehu
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Shto fonded
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Funds;
