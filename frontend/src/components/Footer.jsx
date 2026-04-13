import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">© 2026 UBT</p>
        <Link
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis"
          to="/"
        >
          <img src={logo} alt="UBT Hosting Services" height="28" />
        </Link>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link className="nav-link px-2 text-body-secondary" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2 text-body-secondary" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2 text-body-secondary" to="/services">
              Services
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link px-2 text-body-secondary" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
