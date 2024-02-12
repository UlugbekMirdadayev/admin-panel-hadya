import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = orderSlice;
export const { setProducts } = actions;
export default reducer;
