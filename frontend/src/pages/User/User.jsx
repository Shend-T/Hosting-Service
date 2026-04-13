import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./User.css";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../../features/auth/authSlice";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function User() {
  const URL = "http://localhost:8000/api/abonimi/chart";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;

        setChartData({
          labels: data.map((item) => item.label),
          datasets: [
            {
              label: "Abonimet",
              data: data.map((item) => item.total),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const logOut = () => {
    dispatch(removeToken());
  };

  console.log(token);

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
                <a className="nav-link sidebar-link" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">
                  Serveret Aktiv
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">
                  Monitorimi i Planeve
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">
                  Kerkesat
                </a>
              </li>
              <li className="nav-item">
                <button onClick={() => logOut()}>Log Out</button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1>Dashboard</h1>
            {/* {user && (
              <span className="text-muted">
                Pershendetje, {user.emri} {user.mbiemri}
              </span>
            )} */}
          </div>
          {/* <div className="row mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title text-muted">Current Balance</h6>
                  <h2 className="card-text">
                    ${user.bilanci}
                  </h2>
                </div>
              </div>
            </div>
          </div> */}

          <h2 className="mb-3">Abonimet E Juaja Gjate Kohes</h2>
          {loading ? (
            <p>Loading chart...</p>
          ) : // Ide skom qysh me thon qeto shqip
          chartData ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  //   title: {
                  //     display: true,
                  //     text: "",
                  //   },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          ) : (
            <p>Nuk keni abonime aktive</p>
          )}

          <h2 className="mt-4">Pagesat e Juaja</h2>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Plani</th>
                  <th>Data</th>
                  <th>Statusi</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default User;
