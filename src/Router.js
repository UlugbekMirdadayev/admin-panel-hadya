import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./page/Admin/Admin";
import Afitsant from "./page/Afitsant/Afitsant";
import Sitebar from "./components/Sitebar/Sitebar";
import Addproduct from "./page/Addproduct/Addproduct";
import Order from "./page/Order/Order";

export default function App() {
  return (
    <div className="main">
      <Sitebar />

      <div className="routes">
        <Routes>
          <Route path="/" element={<Afitsant />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/order" element={  <Order/>} />
          <Route path="/addproduct" element={  <Addproduct/>   } />
        </Routes>
      </div>
    </div>
  );
}
