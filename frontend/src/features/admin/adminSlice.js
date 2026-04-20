import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: localStorage.getItem("admin_token") || null,
    isAuthenticated: !!localStorage.getItem("admin_token"),
  },
  reducers: {
    setAdminToken: (state, action) => {
      localStorage.setItem("admin_token", action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    removeAdminToken: (state) => {
      localStorage.removeItem("admin_token");
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdminToken, removeAdminToken } = adminSlice.actions;
export default adminSlice.reducer;
