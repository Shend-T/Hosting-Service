import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
  },
});
