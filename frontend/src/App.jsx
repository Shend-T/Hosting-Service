import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Client from "./pages/Client/Client";
import KlientiGet from "./pages/Client/KlientiGet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/klienti" element={<Client />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
