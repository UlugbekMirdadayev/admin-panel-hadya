import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./page/dashboard";
import { Flex, LoadingOverlay } from "@mantine/core";
import { useLoader } from "./redux/selectors";
import Waiter from "./page/waiter";
import Room from "./page/rooms";
import Orders from "./page/orders";
import Admin from "./page/admin";
import Product from "./page/products";

const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/waiter",
    element: <Waiter />,
  },
  {
    path: "/rooms",
    element: <Room />,
  },
  {
    path: "/products",
    element: <Product />,
  },
  {
    path: "/live-orders",
    element: <Orders />,
  },
  {
    path: "/admin-create",
    element: <Admin />,
  },
];

export default function App() {
  const loading = useLoader();
  return (
    <Flex maw={"100vw"} gutter={0}>
      <Flex miw={200}>
        <Sidebar />
      </Flex>
      <Flex w={"calc(100vw - 200px)"} pos={"relative"}>
        <LoadingOverlay visible={loading} />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </Flex>
    </Flex>
  );
}
