import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    isAuthenticated: !!token,
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    removeToken: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
