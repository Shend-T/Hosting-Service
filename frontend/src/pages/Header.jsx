import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import logo from "../assets/logo.png";

function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down → hide
        setVisible(false);
      } else {
        // Scrolling up → show
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-3"
      // style={{ backgroundColor: "var(--color-primary)" }}
      style={{
        backgroundColor: "var(--color-primary)",
        position: "fixed",
        top: 0,
        width: "100%",
        transition: "top 0.3s ease",
        top: visible ? "0" : "-80px",
        zIndex: 1000,
      }}
    >
      <div className="container">
        <Link className="navbar-brand navbar-logo" to="/">
          <img src={logo} alt="UBT Hosting Services" height="28" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "" + "nav-link"
                }
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
              {/* Dokumentimi per NavLink: https://reactrouter.com/api/components/NavLink */}
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "" + "nav-link"
                }
                to="/about"
                aria-current="page"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "" + "nav-link"
                }
                to="/services"
              >
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "" + "nav-link"
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
