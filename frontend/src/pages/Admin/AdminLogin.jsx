import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setAdminToken } from "../../features/admin/adminSlice";

function AdminLogin() {
  const URL = "http://localhost:8000/api/admin/login";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL, form);
      dispatch(setAdminToken(res.data.token));
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  const isAdmin = useSelector((state) => state.admin.isAuthenticated);
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin]);

  //   Copy-Paste prej Login.jsx
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

                <form onSubmit={loginAdmin}>
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

export default AdminLogin;
