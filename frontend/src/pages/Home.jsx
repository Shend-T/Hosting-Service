import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>

      <button onClick={() => navigate("/klienti")}>CRUD Klienti</button>
      <button onClick={() => navigate("/paketa")}>CRUD Paketa</button>
      <button onClick={() => navigate("/abonimi")}>CRUD Abonimi</button>
    </div>
  );
}

export default Home;
