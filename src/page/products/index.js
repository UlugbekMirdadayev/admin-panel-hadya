import React, { useCallback, useEffect } from "react";
import TableComponent from "./table";
import { useProducts } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { deleteRequest, getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Flex, Title } from "@mantine/core";
import { setProducts } from "../../redux/productSlice";
import ModalScreen from "../../components/modal";
import FormCreate from "./form";

const Product = () => {
  const products = useProducts();

  const dispatch = useDispatch();

  const handleOrders = useCallback(
    (update) => {
      if (!update && products?.length) return;
      dispatch(setLoader(true));
      getRequest("product")
        .then(({ data }) => {
          dispatch(setLoader(false));
          dispatch(setProducts(data?.innerData));
        })
        .catch((err) => {
          dispatch(setLoader(false));
          toast.error(err?.response?.data?.message || "Error");
        });
    },
    [dispatch, products?.length]
  );

  useEffect(() => {
    handleOrders();
  }, [handleOrders]);

  const handleDelete = useCallback(
    (id) => {
      dispatch(setLoader(true));
      deleteRequest(`product/${id}`)
        .then(({ data }) => {
          dispatch(setLoader(false));
          console.log(data);
          toast.info(data?.message);
          handleOrders(true);
        })
        .catch((err) => {
          dispatch(setLoader(false));
          toast.error(err?.response?.data?.message);
        });
    },
    [dispatch, handleOrders]
  );

  return (
    <div className="container-page">
      <Flex justify={"space-between"} align={"center"}>
        <Title>Maxsulotlar</Title>
        <ModalScreen
          title={"Yangi maxsulot qo'shish"}
          btn_title={"Yangi maxsulot qo'shish"}
          body={({ close }) => (
            <FormCreate handleOrders={handleOrders} close={close} />
          )}
        />
      </Flex>
      <TableComponent data={products} handleDelete={handleDelete} />
    </div>
  );
};

export default Product;
