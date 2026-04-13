import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../features/auth/authSlice";

import "./Login.css";

function Login() {
  const URL = "http://localhost:8000/api/login";

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const validateFormData = (form) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email || form.email === " " || !emailRegex.test(form.email)) {
      // Email-i nuk duhet te jet i zbrazt edhe duhet me perfshi ni @ edhe ni .
      alert("E-maili duhet te jet valid");
      return false;
    }
    if (form.password.length < 8) {
      alert("Password-i duhet te jete minimum 8 karaktere");
      return false;
    }

    return true;
  };

  const login = async (e) => {
    e.preventDefault();
    if (validateFormData(form)) {
      try {
        console.log(1);
        // Qetash e msova qe ma mir o axios request me e mbshtjell me try/catch se sa me perdor .then
        const res = await axios.post(URL, form);

        console.log(2);

        dispatch(setToken(res.data.token));
      } catch (error) {
        console.error(error);
      }
    }
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
                  Log In!
                </h1>

                <form onSubmit={login}>
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

                  <Link to="/register">Don't Have An Account?</Link>
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

export default Login;
