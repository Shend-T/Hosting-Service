import { createSlice } from "@reduxjs/toolkit";

const userId = localStorage.getItem("id");
const userFunds = localStorage.getItem("funds");
export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: userId,
    funds: Number(userFunds),
  },
  reducers: {
    setUser: (state, action) => {
      const { id, funds } = action.payload;
      localStorage.setItem("id", id);
      localStorage.setItem("funds", funds);
      state.id = id;
      state.funds = Number(funds);
    },
    removeUser: (state) => {
      localStorage.removeItem("id");
      localStorage.removeItem("funds");
      state.id = 0;
      state.funds = 0.0;
    },
    setFunds: (state, action) => {
      state.funds = action.payload;
      localStorage.setItem("funds", state.funds);
    },
    addFunds: (state, action) => {
      state.funds = Number((state.funds + action.payload).toFixed(2));
      localStorage.setItem("funds", state.funds);
    },
    removeFunds: (state, action) => {
      state.funds = Number((state.funds - action.payload).toFixed(2));
      localStorage.setItem("funds", state.funds);
    },
  },
});

export const { setUser, removeUser, setFunds, addFunds, removeFunds } =
  userSlice.actions;
export default userSlice.reducer;
