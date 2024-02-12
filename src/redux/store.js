import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import report from "./reportSlice";
import loader from "./loaderSlice";
import waiters from "./waiterSlice";
import rooms from "./roomSlice";
import orders from "./orderSlice";
import admin from "./adminSlice";
import products from "./productSlice";

const store = configureStore({
  reducer: {
    user,
    report,
    loader,
    waiters,
    rooms,
    orders,
    admin,
    products,
  },
});

export default store;
