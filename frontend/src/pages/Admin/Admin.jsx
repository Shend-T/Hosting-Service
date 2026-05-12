import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAdminToken } from "../../features/admin/adminSlice";

import AdminDashboard from "./sections/AdminDashboard";
import AdminKlienti from "./sections/AdminKlienti";

function Admin() {
  const URL = "http://localhost:8000/api/admin";
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin = useSelector((state) => state.admin.isAuthenticated);
  const adminToken = useSelector((state) => state.admin.token);
  const [me, setMe] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isAdmin]);

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get(URL + "/me", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setMe(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMe();
  }, []);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(removeAdminToken());
    navigate("/");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

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
                  className={`nav-link sidebar-link ${activePage === "klienti" ? "active" : ""}`}
                  onClick={() => setActivePage("klienti")}
                >
                  Klientët
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link sidebar-link ${activePage === "monitor" ? "active" : ""}`}
                  onClick={() => setActivePage("monitor")}
                >
                  Monitorimi i Abonimeve
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
                  onClick={() => logOut()}
                  // onClick={() => setConfirmLogOut(true)}
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
            <h3>
              zotri, {me.emri} {me.mbiemri}
            </h3>
          </div>

          {activePage == "dashboard" ? (
            <AdminDashboard />
          ) : activePage == "klienti" ? (
            <AdminKlienti />
          ) : (
            <AdminDashboard />
          )}
        </main>
      </div>
    </div>
  );
}

export default Admin;
