import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./pages/Header";
import Footer from "./pages/Footer";

// ===== Faqet e Zakonshme( Spo di term ma tmir) =====
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

// ===== Authentikimi =====
import Register from "./pages/Register/Register";

// ===== CRUD =====
import Klienti from "./pages/Klienti/Klienti";
import Paketa from "./pages/Paketa/Paketa";
import Abonimi from "./pages/Abonimi/Abonimi";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Faqet e zakonshme */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Authentikimi */}
        <Route path="/register" element={<Register />} />
        {/* CRUD-et */}
        <Route path="/klienti" element={<Klienti />} /> {/* Klienti CRUD */}
        <Route path="/paketa" element={<Paketa />} /> {/* Paketa CRUD */}
        <Route path="/abonimi" element={<Abonimi />} /> {/* Abonimi CRUD */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
