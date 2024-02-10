import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = (form) => {
    form.preventDefault();
    const formData = Object.fromEntries(new FormData(form.target));
    if (!formData.phone || !formData.password) {
      toast.info("Raqam va Parolni to'liq kiriting");
      return setError(true);
    }
    setLoading(true);
    axios
      .post("https://api.hadyacrm.uz/api/admin", formData)
      .then(({ data: { message } } = { data: { message: "Success" } }) => {
        toast.info(message);
        axios
          .post("https://api.hadyacrm.uz/api/admin/login", formData)
          .then(({ data }) => {
            localStorage.setItem("xadya-admin-data", JSON.stringify(formData));
            toast.success(data?.message || "Success");
            dispatch(setUser(data?.innerData));
            setLoading(false);
            navigate("/", { replace: true });
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err?.response?.data?.message || "Error");
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || "Error");
        console.log(err);
      });
  };

  return (
    <div className="bg-dark">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={onSubmit} className={error ? "error" : ""}>
        <h3>{"Ro'yxatdan o'tish"}</h3>

        <label htmlFor="fullname">Ism Familiya</label>
        <input
          type="text"
          placeholder="ismingiz"
          id="fullname"
          name="fullname"
        />

        <label htmlFor="phone">Telefon raqami</label>
        <input type="tel" placeholder="998xxxyyzz" id="phone" name="phone" />

        <label htmlFor="password">Parol</label>
        <input
          type="password"
          placeholder="Parol"
          id="password"
          name="password"
        />
        <label className="error">
          {" "}
          {error ? "Ma'lumotlarni to'liq kiriting !" : null}
        </label>
        <button type="submit" disabled={loading}>
          {loading ? <div className="lds-dual-ring" /> : "Ro'yxatdan o'tish"}
        </button>
        <NavLink to={"/login"}>
          <button type="button">{"Kirish"}</button>
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
