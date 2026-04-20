import React, { useState, useEffect } from "react";
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

import { useSelector } from "react-redux";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Dashboard(user) {
  const URL = "http://localhost:8000/api/";

  const token = useSelector((state) => state.auth.token);
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserChartData = async () => {
      try {
        const response = await axios.get(URL + "abonimi/chart", {
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const getUserAbonimi = async () => {
      try {
        const response = await axios.get(URL + "abonimi/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setTableData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserChartData();
    getUserAbonimi();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Abonimet E Juaja Gjate Kohes</h2>
      {loading ? (
        <p>Loading chart...</p>
      ) : // Ide skom qysh me thon qeto shqip
      chartData ? (
        <div style={{ height: "400px", position: "relative" }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
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
        </div>
      ) : (
        <p>Nuk keni abonime aktive</p>
      )}

      <h2 className="mt-4">Pagesat e Juaja</h2>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Plani</th>
              <th>Data Skadimit</th>
              <th>Statusi</th>
            </tr>
          </thead>
          <tbody>
            {tableData
              ? tableData.map((tD) => (
                  <tr key={tD.id}>
                    <td>{tD.paketa.emri}</td>
                    <td>{tD.data_skadimit}</td>
                    <td>{tD.statusi}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
