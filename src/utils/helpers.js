import { useState, useEffect } from "react";
import moment from "moment";
import { deleteRequest } from "../services/api";
import { toast } from "react-toastify";

export function formatCurrencyUZS(amount) {
  const formatter = new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "UZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

export function TimeDifference({ a }) {
  // Hozirgi vaqtni saqlash uchun o'zgaruvchi
  const [b, setB] = useState(moment());

  // a o'zgaruvchisi o'zgarganda, b ni yangilash
  useEffect(() => {
    // Hozirgi vaqtni yangilash
    const intervalId = setInterval(() => {
      setB(moment());
    }, 1000); // Har 1 sekundda bir yangilash

    // Intervalni tozalash
    return () => clearInterval(intervalId);
  }, [a]); // a o'zgaruvchisiga bog'liq efekt

  // a va b oraligi
  const difference = b.diff(moment(a));
  const duration = moment.duration(difference);
  const days = duration.days() || "";
  const hours = duration.hours() || "";
  const minutes = duration.minutes() || "";
  const seconds = duration.seconds() || "";

  return (
    <>
      {days} {days ? " kun , " : ""}
      {hours} {hours ? " soat, " : ""}
      {minutes} {minutes ? " daqiqa , " : ""}
      {seconds} {seconds ? " soniya" : ""}
    </>
  );
}

export const handleDelete = (url, setLoader, handleUpdate, token) => {
  setLoader(true);
  deleteRequest(url, token)
    .then(({ data }) => {
      setLoader(false);
      console.log(data);
      toast.info(data?.message);
      handleUpdate(true);
    })
    .catch((err) => {
      setLoader(false);
      toast.error(err?.response?.data?.message);
    });
};

export const calculatePercentage = (value, percentage) =>
  isNaN(value) || isNaN(percentage)
    ? 0
    : (+value * (+percentage / 100)).toFixed(2);
