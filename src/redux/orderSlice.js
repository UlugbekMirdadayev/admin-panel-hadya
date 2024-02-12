import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    setOrders(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = orderSlice;
export const { setOrders } = actions;
export default reducer;
