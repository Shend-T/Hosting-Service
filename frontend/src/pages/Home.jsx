import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <h3>Shko Te Lista E </h3>
      <button onClick={() => navigate("/klienti")}>Klienteve</button>
    </div>
  );
}

export default Home;
