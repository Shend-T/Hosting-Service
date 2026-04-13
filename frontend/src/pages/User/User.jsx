import React, { useState, useEffect } from "react";
import "./User.css";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../../features/auth/authSlice";
import axios from "axios";

import Dashboard from "./sections/Dashboard";
import Servers from "./sections/Servers";
import Plans from "./sections/Plans";
import Tickets from "./sections/Tickets";

function User() {
  const URL = "http://localhost:8000/api/";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [user, setUser] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(URL + "user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const [confirmLogOut, setConfirmLogOut] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setConfirmLogOut(false);
      }
    };

    if (confirmLogOut) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmLogOut]);

  const logOut = () => {
    dispatch(removeToken());
  };

  return (
    <div className="container-fluid custom-margin">
      <div className="row">
        <button
          className="btn btn-primary d-md-none m-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Mbyll Menu-ne" : "Shfaq Menu-ne"}
        </button>
        <nav
          className={`col-md-3 col-lg-2 bg-light sidebar ${sidebarOpen ? "d-block" : "d-none"} d-md-block`}
          style={{ minHeight: "100vh" }}
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className={`nav-link sidebar-link ${activePage === "dashboard" ? "active" : ""}`}
                  onClick={() => setActivePage("dashboard")}
                >
                  Paneli
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link sidebar-link ${activePage === "servers" ? "active" : ""}`}
                  onClick={() => setActivePage("servers")}
                >
                  Serveret Aktiv
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link sidebar-link ${activePage === "monitor" ? "active" : ""}`}
                  onClick={() => setActivePage("monitor")}
                >
                  Monitorimi i Planeve
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link sidebar-link ${activePage === "tickets" ? "active" : ""}`}
                  onClick={() => setActivePage("tickets")}
                >
                  Kerkesat(Tiketat)
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link sidebar-link"
                  onClick={() => setConfirmLogOut(true)}
                >
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1>Pershendetje,</h1>
            {user && (
              <h1 className="h3">
                {user.emri} {user.mbiemri}
              </h1>
            )}
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title text-muted">Bilanci Juaj Aktual</h6>
                  {user && <h2 className="card-text">${user.bilanci}</h2>}
                  <button>Shto fonde</button>
                </div>
              </div>
            </div>
          </div>

          {activePage == "dashboard" ? (
            <Dashboard user={user} />
          ) : activePage == "servers" ? (
            <Servers />
          ) : activePage == "monitor" ? (
            <Plans />
          ) : activePage == "tickets" ? (
            <Tickets />
          ) : (
            <Dashboard user={user} />
          )}
        </main>
      </div>
      {confirmLogOut && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setConfirmLogOut(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">A je sigurt?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setConfirmLogOut(false)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmLogOut(false)}
                >
                  Jo
                </button>
                <button className="btn btn-danger" onClick={() => logOut()}>
                  Po, Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
