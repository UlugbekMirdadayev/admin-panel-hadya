import React, { useCallback, useEffect } from "react";
import TableComponent from "./table";
import { useRooms } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Title } from "@mantine/core";
import { setRooms } from "../../redux/roomSlice";

const Room = () => {
  const rooms = useRooms();

  const dispatch = useDispatch();

  const handleGetRooms = useCallback(() => {
    if (rooms?.length) return;
    dispatch(setLoader(true));
    getRequest("room")
      .then(({ data }) => {
        dispatch(setLoader(false));
        dispatch(setRooms(data?.innerData));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        toast.error(err?.response?.data?.message || "Error");
      });
  }, [dispatch, rooms?.length]);

  useEffect(() => {
    handleGetRooms();
  }, [handleGetRooms]);

  return (
    <div className="container-page">
      <Title>Ofitsiantlar</Title>
      <TableComponent data={rooms} />
    </div>
  );
};

export default Room;
