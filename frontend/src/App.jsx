import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import KlientiGet from "./pages/Client/KlientiGet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/klienti" element={<KlientiGet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
