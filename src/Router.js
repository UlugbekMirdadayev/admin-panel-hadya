import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./page/dashboard";
import { Box, Flex, LoadingOverlay, Select } from "@mantine/core";
import { useLoader, useProducts, useUser } from "./redux/selectors";
import Waiter from "./page/waiter";
import Room from "./page/rooms";
import Orders from "./page/orders";
import Admin from "./page/admin";
import Product from "./page/products";
import Login from "./page/admin/login";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { post } from "./services/api";
import { setLoader } from "./redux/loaderSlice";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { departments } from "./utils/constants";
import { setRooms } from "./redux/roomSlice";
import io from "socket.io-client";
const socket = io("wss://api.hadyacrm.uz");

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
  {
    path: "/login",
    element: <Login />,
  },
];

export default function App() {
  const navigate = useNavigate();
  const user = useUser();
  const products = useProducts();
  const dispatch = useDispatch();
  const [order, setOrder] = useState({});
  const [printType, setPrintType] = useState(departments[0].value);
  const [prods, setProds] = useState([]);
  const [orderPrintData, setOrderPrintData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const loading = useLoader();
  const { pathname } = useLocation();

  const refs = departments.map(useRef);
  const handlePrint = useReactToPrint({
    removeAfterPrint: true,
    onAfterPrint: () =>
      setActiveData((activeData) =>
        activeData.filter((index) => index !== activeIndex)
      ),
  });

  const isHideSideBar = useMemo(
    () => ["/login"].includes(pathname),
    [pathname]
  );

  useEffect(() => {
    if (user?.active !== 1) {
      const values = JSON.parse(localStorage["user-xadya"] || "{}");
      if (values?.phone) {
        dispatch(setLoader(true));
        post("admin/login", values)
          .then(({ data }) => {
            dispatch(setLoader(false));
            dispatch(setUser(data?.innerData));
            localStorage.setItem("token-xadya", data?.innerData?.token);
          })
          .catch((err) => {
            dispatch(setLoader(false));
            toast.error(err?.response?.data?.message || "Error");
            navigate("/login", { replace: true });
            localStorage.clear();
          });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [dispatch, navigate, user?.active]);

  useEffect(() => {
    const arr = prods.map((prod) => {
      const product = products?.find((item) => item?.id === prod?.product_id);
      return {
        ...product,
        quantity: prod?.quantity,
        total_price: prod?.quantity * product?.price,
      };
    });
    const orderTypes = [...new Set(arr.map(({ department }) => department))];
    const orders = orderTypes.map((department) => ({
      department,
      products: arr.filter((product) => product?.department === department),
    }));

    setOrderPrintData(orders);

    setActiveData(
      orders.map(
        ({ department }) =>
          departments.find((item) => item.value === department)?.index
      )
    );

    //
  }, [prods, products]);

  useEffect(() => {
    activeData.map((index) => {
      handlePrint(null, () => refs[index].current);
      return setActiveIndex(index);
    });
  }, [activeData, handlePrint, refs]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("/order");
      socket.emit("/rooms");
      socket.on("/order", (data) => {
        console.log(data);
        setOrder(data);
        setProds(data?.order?.orders);
      });
      socket.on("/rooms", (data) => {
        console.log("====================================");
        console.log(data, "datadata");
        console.log("====================================");
        dispatch(setRooms(data));
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    console.log(orderPrintData, "orderPrintData");
  }, [orderPrintData]);

  return (
    <Flex maw={"100vw"} gutter={0}>
      {isHideSideBar ? null : (
        <Box miw={200}>
          <Box p={"lg"}>
            <Select
              required
              mt={"md"}
              label="Printerga chiqarish"
              value={printType}
              onChange={(value, { index }) => {
                setPrintType(value);
                handlePrint(null, () => refs[index].current);
              }}
              data={departments.map((item) => ({
                ...item,
                disabled: printType === item.value,
              }))}
            />
            <div
              style={{
                display: "none",
              }}
            >
              {departments.map(({ value }, i) => {
                const item = orderPrintData.find(
                  (order) => order?.department === value
                );
                return (
                  <React.Fragment key={value}>
                    <div ref={refs[i]} className="cheque">
                      <strong>Buyurtma {value}</strong>
                      <div>
                        Xona/Stol raqami:{" "}
                        <strong>
                          <i>{order?.room?.room_name || 2}</i>
                        </strong>
                      </div>
                      <div>
                        Ofitsiant ismi:{" "}
                        <strong>
                          <i>
                            {order?.room?.afitsant_name ||
                              "Ulug'bek Mirdadayev"}
                          </i>
                        </strong>
                      </div>
                      <div>
                        Product:
                        {item?.products?.map((it) => (
                          <strong>
                            <i>
                              {it?.name || "Pizza 39sm"} <br />
                            </i>
                          </strong>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </Box>
          <Sidebar />
        </Box>
      )}
      <Flex
        w={`calc(100dvw - ${isHideSideBar ? "0px" : "200px"})`}
        mih={isHideSideBar ? "100dvh" : "none"}
        pos={"relative"}
        style={{
          overflowY: "auto",
          maxHeight: "100dvh",
        }}
      >
        <LoadingOverlay
          overlayProps={{ radius: "sm" }}
          loaderProps={{ type: "dots" }}
          visible={loading}
        />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </Flex>
    </Flex>
  );
}
