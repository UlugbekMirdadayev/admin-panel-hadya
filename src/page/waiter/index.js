import React, { useCallback, useEffect } from "react";
import TableComponent from "./table";
import { useWaiter } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Title } from "@mantine/core";
import { setWaiters } from "../../redux/waiterSlice";

const Waiter = () => {
  const waiters = useWaiter();

  const dispatch = useDispatch();

  const handleGetWaiters = useCallback(() => {
    if (waiters?.length) return;
    dispatch(setLoader(true));
    getRequest("afitsant")
      .then(({ data }) => {
        dispatch(setLoader(false));
        dispatch(setWaiters(data?.innerData));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        toast.error(err?.response?.data?.message || "Error");
      });
  }, [dispatch, waiters?.length]);

  useEffect(() => {
    handleGetWaiters();
  }, [handleGetWaiters]);

  return (
    <div className="container-page">
      <Title>Ofitsiantlar</Title>
      <TableComponent data={waiters} />
    </div>
  );
};

export default Waiter;
