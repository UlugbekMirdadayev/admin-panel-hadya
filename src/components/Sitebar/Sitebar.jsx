import React from "react";
import { NavLink } from "react-router-dom";
import "./css.css";

export default function Sitebar() {
  return (
    <div className="sitebar">
      <h1>Hadya Admin</h1>

      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/">Afitsant boshqaruv</NavLink>
      <NavLink to="/order">Zakaslar</NavLink>
      <NavLink to="/addproduct">Maxsulot qo'shish</NavLink>
    </div>
  );
}
