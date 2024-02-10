import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = postsSlice;
export const { setUser } = actions;
export default reducer;
