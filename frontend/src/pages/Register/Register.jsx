import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../features/auth/authSlice";

import "./Register.css";

function Register() {
  const URL = "http://localhost:8000/api/register";

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    emri: "",
    mbiemri: "",
    kompania: "",
    email: "",
    password: "",
    password_confirmation: "",
    telefoni: "",
    adresa: "",
  });
  const [confirmedTerms, setConfirmedTerms] = useState(false);

  const validateFormData = (form) => {
    // ==== Koment per ma von ====
    // Boje 'clean-up kodin, edhe mir o shqip me bo krejt tekstin
    if (!confirmedTerms) {
      alert("Duhet me agree to terms & services");
      return false;
    }

    if (
      !form.emri ||
      !form.emri.trim() ||
      !form.mbiemri ||
      !form.mbiemri.trim() ||
      !form.kompania ||
      !form.kompania.trim() === " "
    ) {
      // https://developer.mozilla.org/en-US/docs/Glossary/Falsy
      // Emri mbiemri edhe kompania nuk bon me qen te zbrazta
      alert("Emri, mbiemri dhe kompania nuk ben te jene te zbrazta");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email || form.email === " " || !emailRegex.test(form.email)) {
      // Email-i nuk duhet te jet i zbrazt edhe duhet me perfshi ni @ edhe ni .
      alert("E-maili duhet te jet valid");
      return false;
    }
    if (
      form.password.length < 8 ||
      form.password_confirmation.length < 8 ||
      form.password !== form.password_confirmation
    ) {
      alert(
        "Password-i duhet te jete minimum 8 karaktere dhe duhet te jete i njejt me konfirmimin",
      );
      return false;
    }
    if (!form.adresa || !form.adresa.trim()) {
      alert("Adresa nuk ben te jete e zbrazte");
      return false;
    }
    const telefoniRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (
      !form.telefoni ||
      form.telefoni === " " ||
      !telefoniRegex.test(form.telefoni)
    ) {
      alert(
        "Numri telefonit duhet tja nis me +000 dhe duhet te jete numer valid",
      );
      return false;
    }

    return true;
  };

  const register = async (e) => {
    e.preventDefault();

    if (validateFormData(form)) {
      await axios
        .post(URL, form)
        .then(function (response) {
          dispatch(setToken(response.data.token));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(form);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated]);

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
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="..."
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="form-floating floating-border mb-3">
                    <input
                      type="password"
                      name="password_confirmation"
                      className="form-control"
                      id="password_confirmation"
                      placeholder="..."
                      value={form.password_confirmation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password_confirmation: e.target.value,
                        })
                      }
                      required
                    />
                    <label htmlFor="password_confirmation">
                      Confirm Password
                    </label>
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
                  <div className="mb-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="terms"
                      id="terms"
                      checked={confirmedTerms}
                      onChange={(e) => setConfirmedTerms(e.target.checked)}
                    />
                    <label className="form-check-label ms-2" htmlFor="terms">
                      By Clicking This Box You Agree To Our{" "}
                      <Link to="/terms" target="_blank">
                        Terms & Services
                      </Link>
                    </label>
                  </div>

                  <Link to="/login">Already Have An Account?</Link>
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
