import React, { useCallback, useEffect } from "react";
import TableComponent from "./table";
import { useAdmins } from "../../redux/selectors";
import { setAdmins } from "../../redux/adminSlice";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Text, Title } from "@mantine/core";
import moment from "moment";

const Admin = () => {
  const admins = useAdmins();

  const dispatch = useDispatch();

  const handleDashboard = useCallback(() => {
    if (admins?.length) return;
    dispatch(setLoader(true));
    getRequest("admin")
      .then(({ data }) => {
        dispatch(setLoader(false));
        dispatch(setAdmins(data?.innerData));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        toast.error(err?.response?.data?.message || "Error");
      });
  }, [dispatch, admins?.length]);

  useEffect(() => {
    handleDashboard();
  }, [handleDashboard]);

  return (
    <div className="container-page">
      <Title>Hisobotlar ofitsantlar bo'yicha</Title>
      <Text fw={600} fz={"lg"}>
        {moment("2024-02-01").format("DD-MM-YYYY")} dan
        {moment("2024-02-20").format("DD-MM-YYYY")} gacha
      </Text>
      <TableComponent data={admins} />
    </div>
  );
};

export default Admin;
