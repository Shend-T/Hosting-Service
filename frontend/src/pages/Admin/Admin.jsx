import React, { useState, useEffect } from "react";
import "./Admin.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAdminToken } from "../../features/admin/adminSlice";

import AdminDashboard from "./sections/AdminDashboard";
import AdminKlienti from "./sections/AdminKlienti";
import AdminPaketa from "./sections/AdminPaketa";
import AdminServeret from "./sections/AdminServeret";
import AdminLlogariHostings from "./sections/AdminLlogariHostings";
import AdminDomainet from "./sections/AdminDomainet";

import Modal from "../../components/Common/Modal";

import { HashLoader, RingLoader, PropagateLoader } from "react-spinners";
import AdminAbonimi from "./sections/AdminAbonimi";

function Admin() {
  const URL = "http://localhost:8000/api/admin";
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin = useSelector((state) => state.admin.isAuthenticated);
  const adminToken = useSelector((state) => state.admin.token);
  const [me, setMe] = useState(null);

  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getMe();
  }, []);

  const dispatch = useDispatch();
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const logOut = async () => {
    setLoading(true);
    try {
      await axios.post(
        URL + "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            Accept: "application/json",
          },
        },
      );

      dispatch(removeAdminToken());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <HashLoader size={70} color="#2c687b" />
          {/* <PropagateLoader size={20} color="#2c687b" /> */}
          {/* <RingLoader size={70} color="#2c687b" /> */}
        </div>
      ) : (
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
                      className={`nav-link sidebar-link ${activePage === "paketa" ? "active" : ""}`}
                      onClick={() => setActivePage("paketa")}
                    >
                      Paketat
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link sidebar-link ${activePage === "abonimi" ? "active" : ""}`}
                      onClick={() => setActivePage("abonimi")}
                    >
                      Abonimet
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link sidebar-link ${activePage === "servers" ? "active" : ""}`}
                      onClick={() => setActivePage("servers")}
                    >
                      Serverët
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link sidebar-link ${activePage === "llogari-hostings" ? "active" : ""}`}
                      onClick={() => setActivePage("llogari-hostings")}
                    >
                      Llogaritë e Hostingut
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link sidebar-link ${activePage === "domainet" ? "active" : ""}`}
                      onClick={() => setActivePage("domainet")}
                    >
                      Domainet
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
                      onClick={() => setShowLogOutModal(true)}
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
              ) : activePage == "paketa" ? (
                <AdminPaketa />
              ) : activePage == "abonimi" ? (
                <AdminAbonimi />
              ) : activePage == "servers" ? (
                <AdminServeret />
              ) : activePage == "llogari-hostings" ? (
                <AdminLlogariHostings />
              ) : activePage == "domainet" ? (
                <AdminDomainet />
              ) : (
                <AdminDashboard />
              )}
            </main>
          </div>
        </div>
      )}

      {showLogOutModal && (
        <Modal
          show={showLogOutModal}
          onClose={() => setShowLogOutModal(false)}
          title="A jeni sigurt?"
        >
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => logOut()}>
              Po, Log Out
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowLogOutModal(false)}
            >
              Jo, Mbyll
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Admin;
