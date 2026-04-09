import React from "react";

import logo from "../../public/logo.png";

function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">© 2026 UBT</p>
        <a
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis"
          href="#"
        >
          <img src={logo} alt="UBT Hosting Services" height="28" />
          {/* Ma von */}
        </a>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a className="nav-link px-2 text-body-secondary" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link px-2 text-body-secondary" href="#">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link px-2 text-body-secondary" href="#">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link px-2 text-body-secondary" href="#">
              About
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
