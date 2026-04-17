import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// ===== Faqet e Zakonshme( Spo di term ma tmir) =====
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Terms from "./pages/Terms/Terms";

// ===== Authentikimi =====
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

// ===== Dashboard-i & Faqet Tjera =====
import User from "./pages/User/User";
import Services from "./pages/Services/Services";

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
        <Route path="/terms" element={<Terms />} />
        {/* Authentikimi */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Dashboard */}
        <Route path="/user" element={<User />} />
        <Route path="/services" element={<Services />} />
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
