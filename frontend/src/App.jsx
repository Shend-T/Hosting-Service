import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// ===== Faqet e Zakonshme( Spo di term ma tmir) =====
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FAQ from "./pages/FAQ/FAQ";
import Terms from "./pages/Terms/Terms";
import FAQ from "./pages/FAQ/FAQ";

// ===== Authentikimi =====
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

// ===== Dashboard-i & Faqet Tjera =====
import User from "./pages/User/User";
import Services from "./pages/Services/Services";

// ===== Admin =====
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";

// ===== CRUD =====
import Klienti from "./pages/Klienti/Klienti";
import Paketa from "./pages/Paketa/Paketa";
import Abonimi from "./pages/Abonimi/Abonimi";
import NotFound from "./components/Error/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Faqet e zakonshme */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
        {/* Authentikimi */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Dashboard */}
        <Route path="/user" element={<User />} />
        <Route path="/services" element={<Services />} />
        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* CRUD-et */}
        <Route path="/klienti" element={<Klienti />} /> {/* Klienti CRUD */}
        <Route path="/paketa" element={<Paketa />} /> {/* Paketa CRUD */}
        <Route path="/abonimi" element={<Abonimi />} /> {/* Abonimi CRUD */}
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
