// import { useCallback, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { Text } from "@mantine/core";
import classes from "./style.module.css";
import { NavLink } from "react-router-dom";
// import { setReport } from "../../redux/reportSlice";
// import { toast } from "react-toastify";
// import { getRequest } from "../../services/api";
// import { setLoader } from "../../redux/loaderSlice";

const tabs = [
  { link: "/", label: "Hisobotlar" },
  { link: "/live-orders", label: "Aktiv buyurtmalar" },
  { link: "/waiter", label: "Ofitsiant" },
  { link: "/products", label: "Maxsulotlar" },
  { link: "/rooms", label: "Xonalar/Stollar" },
  { link: "/admin-create", label: "Boshqaruvchi qo'shish" },
];

export default function Sidebar() {
  // const dispatch = useDispatch();

  // const handleDashboard = useCallback(() => {
  //   dispatch(setLoader(true));
  //   getRequest("report?from=2024-02-01&to=2024-02-20")
  //     .then(({ data }) => {
  //       dispatch(setLoader(false));
  //       dispatch(setReport(data?.innerData));
  //     })
  //     .catch((err) => {
  //       dispatch(setLoader(false));
  //       toast.error(err?.response?.data?.message || "Error");
  //     });
  // }, [dispatch]);

  // useEffect(() => {
  //   handleDashboard();
  // }, [handleDashboard]);

  const links = tabs.map((item) => (
    <NavLink
      className={classes.link}
      to={item.link}
      key={item.label}
      children={<span>{item.label}</span>}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
        Hadya
      </Text>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
