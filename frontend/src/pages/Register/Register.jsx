import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Register.css";

function Register() {
  const URL = "http://localhost:8000/klienti";

  const [form, setForm] = useState({
    emri: "",
    mbiemri: "",
    kompania: "",
    email: "",
    telefoni: "",
    adresa: "",
    statusi: "aktiv",
    bilanci: 0,
  });

  const register = async (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-lg card-registration"
              style={{
                borderRadius: "15px",
              }}
            >
              <div className="card-body p-4 p-md-5">
                <h1 className="text-center h1 fw-bold mb-5 pb-2 mx-1 mx-md-4 mt-4 border-bottom">
                  Sign Up!
                </h1>

                <form onSubmit={register}>
                  <div className="form-floating floating-border mb-3">
                    <input
                      type="text"
                      name="emri"
                      className="form-control"
                      id="emri"
                      placeholder="Filan"
                      value={form.emri}
                      onChange={(e) =>
                        setForm({ ...form, emri: e.target.value })
                      }
                      required
                    />
                    <label htmlFor="emri">Name</label>
                  </div>
                  <div className="form-floating floating-border mb-3">
                    <input
                      type="text"
                      name="mbiemri"
                      className="form-control"
                      id="mbiemri"
                      placeholder="Fisteku"
                      value={form.mbiemri}
                      onChange={(e) =>
                        setForm({ ...form, mbiemri: e.target.value })
                      }
                      required
                    />
                    <label htmlFor="mbiemri">Last Name</label>
                  </div>

                  <div className="form-floating floating-border mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                    <label htmlFor="email">E-Mail Address</label>
                  </div>
                  <div className="form-floating floating-border mb-3">
                    <input
                      type="text"
                      name="kompania"
                      className="form-control"
                      id="kompania"
                      placeholder="n/a"
                      value={form.kompania}
                      onChange={(e) =>
                        setForm({ ...form, kompania: e.target.value })
                      }
                      required
                    />
                    <label htmlFor="kompania">Company Name</label>
                  </div>

                  <div className="form-floating floating-border mb-3">
                    <input
                      type="text"
                      name="adresa"
                      className="form-control"
                      id="adresa"
                      placeholder="Kosova"
                      value={form.adresa}
                      onChange={(e) =>
                        setForm({ ...form, adresa: e.target.value })
                      }
                      required
                    />
                    <label htmlFor="adresa">Address</label>
                  </div>
                  <div className="form-floating floating-border mb-3">
                    <input
                      type="text"
                      name="telefoni"
                      className="form-control"
                      id="telefoni"
                      placeholder="+383 00-000-000"
                      value={form.telefoni}
                      onChange={(e) =>
                        setForm({ ...form, telefoni: e.target.value })
                      }
                      required
                    />
                    <label htmlFor="telefoni">Phone Number</label>
                  </div>

                  <Link to="/login">Already Have An Account?</Link>
                  {/* <div className="mt-4 pt-2">
                    <input
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                  </div> */}
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <input
                      type="submit"
                      className="btn btn-primary btn-lg"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
