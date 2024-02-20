import React, { useCallback, useEffect } from "react";
import TableComponent from "./table";
import { useAdmins, useUser } from "../../redux/selectors";
import { setAdmins } from "../../redux/adminSlice";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Button, Flex, Title } from "@mantine/core";
import { Reload } from "../../components/icon";

const Admin = () => {
  const user = useUser();
  const admins = useAdmins();

  const dispatch = useDispatch();

  const handleDashboard = useCallback(
    (update) => {
      if (!update && admins?.length) return;
      dispatch(setLoader(true));
      getRequest("admin", user?.token)
        .then(({ data }) => {
          dispatch(setLoader(false));
          dispatch(setAdmins(data?.innerData));
        })
        .catch((err) => {
          dispatch(setLoader(false));
          toast.error(err?.response?.data?.message || "Error");
        });
    },
    [dispatch, admins?.length, user?.token]
  );

  useEffect(() => {
    handleDashboard();
  }, [handleDashboard]);

  return (
    <div className="container-page">
      <Flex gap={30} maw={600} align={"center"} justify={"space-between"}>
        <Title>Ish boshqaruvchilar</Title>
        <Button px={"xs"} onClick={() => handleDashboard(true)}>
          <Flex align={"center"} gap={"xs"}>
            <Reload fill="#fff" />
            <Title fz={"xs"}>Ma'lumotni yangilash</Title>
          </Flex>
        </Button>
      </Flex>
      <TableComponent
        data={admins}
        setLoader={(boolean) => dispatch(setLoader(boolean))}
        setAdmins={(data) => dispatch(setAdmins(data))}
      />
    </div>
  );
};

export default Admin;
