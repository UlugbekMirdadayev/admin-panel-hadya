import React, { useCallback, useEffect } from "react";
import TableComponent from "./table";
import { useReport } from "../../redux/selectors";
import { setReport } from "../../redux/reportSlice";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Text, Title } from "@mantine/core";
import moment from "moment";

const Dashboard = () => {
  const report = useReport();

  const dispatch = useDispatch();

  const handleDashboard = useCallback(() => {
    if (report?.orders?.length) return;
    dispatch(setLoader(true));
    getRequest("report?from=2024-02-01&to=2024-02-20")
      .then(({ data }) => {
        dispatch(setLoader(false));
        dispatch(setReport(data?.innerData));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        toast.error(err?.response?.data?.message || "Error");
      });
  }, [dispatch, report?.orders?.length]);

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
      <TableComponent data={report} />
    </div>
  );
};

export default Dashboard;
