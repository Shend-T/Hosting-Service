import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home/Home";

import Klienti from "./pages/Klienti/Klienti";
import Paketa from "./pages/Paketa/Paketa";
import Abonimi from "./pages/Abonimi/Abonimi";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/klienti" element={<Klienti />} />
        <Route path="/paketa" element={<Paketa />} />
        <Route path="/abonimi" element={<Abonimi />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;