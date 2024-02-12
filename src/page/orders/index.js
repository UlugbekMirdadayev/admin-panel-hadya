import React, { useCallback, useEffect } from "react";
import TableComponent from "./table";
import { useOrders } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Title } from "@mantine/core";
import { setOrders } from "../../redux/orderSlice";

const Order = () => {
  const orders = useOrders();

  const dispatch = useDispatch();

  const handleOrders = useCallback(() => {
    if (orders?.length) return;
    dispatch(setLoader(true));
    getRequest("order?active=1")
      .then(({ data }) => {
        dispatch(setLoader(false));
        dispatch(setOrders(data?.innerData));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        toast.error(err?.response?.data?.message || "Error");
      });
  }, [dispatch, orders?.length]);

  useEffect(() => {
    handleOrders();
  }, [handleOrders]);

  return (
    <div className="container-page">
      <Title>Aktiv buyurtmalar</Title>
      <TableComponent data={orders} />
    </div>
  );
};

export default Order;
