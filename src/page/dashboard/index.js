import React, { useCallback, useEffect, useState } from "react";
import { Button, Flex, Select, Text, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import TableComponent from "./table";
import { useReport, useUser } from "../../redux/selectors";
import { setReport } from "../../redux/reportSlice";
import { setLoader } from "../../redux/loaderSlice";
import { getRequest } from "../../services/api";
import { departments } from "../../utils/constants";

const Dashboard = () => {
  const user = useUser();
  const [isTodayData, setIsTodayData] = useState(false);
  const [value, setValue] = useState([
    new Date(new Date().setDate(new Date().getDate() - 7)),
    new Date(),
  ]);
  const [department, setDepartment] = useState({
    label: "Afitsantlar",
    value: "0",
  });
  const report = useReport();

  const dispatch = useDispatch();

  const handleDashboard = useCallback(() => {
    if (value.filter(Boolean).length === 2) {
      dispatch(setLoader(true));
      const departmentParams =
        department.value === "0" ? "" : `/department/${department.value}`;

      getRequest(
        `report${departmentParams}?${value
          .map(
            (d, i) => (i ? "&to=" : "from=") + moment(d).format("YYYY-MM-DD")
          )
          .join("")}`,
        user?.token
      )
        .then(({ data }) => {
          dispatch(setLoader(false));
          if (data?.innerData?.orders) {
            dispatch(setReport(data?.innerData));
          } else {
            dispatch(setReport({ orders: data?.innerData }));
          }
        })
        .catch((err) => {
          dispatch(setLoader(false));
          toast.error(err?.response?.data?.message || "Error");
        });
    }
  }, [dispatch, value, department.value, user?.token]);

  useEffect(() => {
    handleDashboard();
  }, [handleDashboard]);

  return (
    <div className="container-page">
      <div>
        <Title>Hisobotlar {department?.label} bo'yicha</Title>

        <Flex align={"flex-end"} gap={"lg"} my={"lg"}>
          <Select
            label="Ishchilar bo'yicha"
            data={[{ label: "Afitsantlar", value: "0" }, ...departments].map(
              (item) =>
                item.value === department.value
                  ? { ...item, disabled: true }
                  : item
            )}
            defaultValue={"0"}
            required
            onChange={(value) =>
              setDepartment(
                [{ label: "Afitsantlar", value: "0" }, ...departments]?.find(
                  (item) => item?.value === value
                )
              )
            }
          />
          <DatePickerInput
            required
            label="Sanasi bo'yicha"
            type="range"
            value={value}
            onChange={(date) => {
              setValue(date);
              setIsTodayData(false);
            }}
            maxDate={new Date()}
            minDate={new Date().setMonth(new Date().getMonth() - 1)}
          />
          <Button
            onClick={() => {
              if (isTodayData) return null;
              setValue([new Date(), new Date()]);
              setIsTodayData(true);
            }}
          >
            Bugunlik hisobot
          </Button>
        </Flex>
      </div>
      <Text fw={600} fz={"lg"}>
        {isTodayData
          ? "Bugungi 24 soatlik hisobot"
          : value.filter(Boolean).length === 2
          ? value.map(
              (d, i) =>
                moment(d).format("DD-MM-YYYY") + (i ? " gacha" : " dan ")
            )
          : null}
      </Text>
      <TableComponent
        data={report}
        user={user}
        setLoader={(boolean) => dispatch(setLoader(boolean))}
      />
    </div>
  );
};

export default Dashboard;
