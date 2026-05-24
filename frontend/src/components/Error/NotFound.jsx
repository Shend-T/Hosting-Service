import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "../../assets/error/404-1.png";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="container-main py-5"
      style={{ height: "90vh", alignContent: "center" }}
    >
      <div className="container-sm px-4 pt-4 mt-5 text-center rounded">
        <div
          className="overflow-hidden"
          style={{ maxWidth: "30vh", margin: "auto" }}
        >
          <div className="container px-5">
            <img
              className="img-fluid mb-4"
              src={image1}
              alt=""
              loading="lazy"
            />
          </div>
        </div>
        <h1 className="display-4 fw-bold">
          <span className="text-primary">404</span>, Kjo Faqe Nuk Ekziston
        </h1>
        <div className="col-lg-6 mx-auto">
          <div className="d-flex justify-content-center gap-3 mb-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/")}
            >
              Kthehu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
