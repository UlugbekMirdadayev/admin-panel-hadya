import React from "react";
import { Route, Routes } from "react-router-dom";
import Afitsant from "./page/Afitsant/Afitsant";
import Sitebar from "./components/Sitebar/Sitebar";
import Addproduct from "./page/Addproduct/Addproduct";
import Order from "./page/Order/Order";
import Login from "./page/auth/login";
import Register from "./page/auth/register";

export default function App() {
  return (
    <div className="main">
      <Sitebar />

      <div className="routes">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes  */}

          <Route path="/" element={<Afitsant />} />
          <Route path="/admin" element={<Register />} />
          <Route path="/order" element={<Order />} />
          <Route path="/addproduct" element={<Addproduct />} />
        </Routes>
      </div>
    </div>
  );
}
