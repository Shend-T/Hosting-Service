import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAdminToken } from "../../features/admin/adminSlice";

function Admin() {
  const URL = "http://localhost:8000/admin";
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin = useSelector((state) => state.admin.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isAdmin]);

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
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
