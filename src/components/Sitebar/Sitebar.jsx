import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./css.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../../redux/userSlice";
import { useUser } from "../../redux/selectors";

const openRoutes = ["/login"];

export default function Sitebar() {
  const user = useUser();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      if (localStorage["xadya-admin-data"]) {
        const formData = JSON.parse(localStorage["xadya-admin-data"] || "{}");
        axios
          .post("https://api.hadyacrm.uz/api/admin/login", formData)
          .then(({ data }) => {
            localStorage.setItem("xadya-admin-data", JSON.stringify(formData));
            toast.success(data?.message || "Success");
            dispatch(setUser(data?.innerData));
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || "Error");
            localStorage.clear();
            console.log(err);
          });
      } else {
        if (!openRoutes.includes(pathname)) {
          navigate("/login", { replace: true });
        }
      }
    }
  }, [navigate, dispatch, pathname, user?.id]);

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
