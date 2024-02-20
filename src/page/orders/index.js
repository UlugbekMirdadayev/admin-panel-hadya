import React, { useCallback, useEffect } from "react";
import TableComponent from "./table";
import { useOrders, useUser } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Button, Flex, Title } from "@mantine/core";
import { setOrders } from "../../redux/orderSlice";
import { Reload } from "../../components/icon";

const Order = () => {
  const user = useUser();
  const orders = useOrders();

  const dispatch = useDispatch();

  const handleOrders = useCallback(
    (update) => {
      if (!update && orders?.length) return;
      dispatch(setLoader(true));
      getRequest("order?active=1", user?.token)
        .then(({ data }) => {
          dispatch(setLoader(false));
          dispatch(setOrders(data?.innerData));
        })
        .catch((err) => {
          dispatch(setLoader(false));
          toast.error(err?.response?.data?.message || "Error");
        });
    },
    [dispatch, orders?.length, user?.token]
  );

  useEffect(() => {
    handleOrders();
  }, [handleOrders]);

  return (
    <div className="container-page">
      <Flex gap={30} maw={600} align={"center"} justify={"space-between"}>
        <Title>Aktiv buyurtmalar</Title>
        <Button onClick={() => handleOrders(true)}>
          <Flex align={"center"} gap={10}>
            <Reload fill="#fff" />
            <span>Ma'lumotlarni Yangilash</span>
          </Flex>
        </Button>
      </Flex>
      <TableComponent data={orders} />
    </div>
  );
};

export default Order;
