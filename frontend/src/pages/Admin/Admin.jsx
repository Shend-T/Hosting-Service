import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAdminToken } from "../../features/admin/adminSlice";

function Admin() {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin = useSelector((state) => state.admin.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isAdmin]);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(removeAdminToken());
    navigate("/");
  };

  return (
    <div style={{ marginTop: "10vh" }} className="container">
      <h1>Momentalisht nuk ka admin page</h1>
      <h3>Na vjen shum keq, por ne te ardhmen e afert vjen</h3>

      <button onClick={() => logOut()}>Log Out Prej Admin</button>
    </div>
  );
}

export default Admin;
