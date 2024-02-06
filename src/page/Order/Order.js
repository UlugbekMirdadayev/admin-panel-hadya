import React, { useState, useEffect, useRef } from "react";
import "./css.css";
import axios from "axios";
import { useOutsideClick } from "../../utils/hook";
import io from "socket.io-client";
const socket = io.connect("https://api.hadyacrm.uz");

export default function Order() {
  const wrapperRef = useRef();
  // get all order https://api.hadyacrm.uz/api
  const [order, setOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderById, setOrderById] = useState([]);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const token =
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMmFlOSIsImZ1bGxuYW1lIjoiQmVrem9kIiwicGhvbmUiOjk5ODkzOTA3NTM1MCwicGFzc3dvcmQiOiI4YzY5NzZlNWI1NDEwNDE1YmRlOTA4YmQ0ZGVlMTVkZmIxNjdhOWM4NzNmYzRiYjhhODFmNmYyYWI0NDhhOTE4IiwiYmFsYW5jZSI6MCwiYWN0aXZlIjowLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyNC0wMi0wMVQxNTo0MTozMC4wMDBaIiwidXBkYXRlZF9hdCI6bnVsbCwiaWF0IjoxNzA3MTYyMjgzLCJleHAiOjE3MDk3NTQyODN9.C23tcebnuYTWKjBl6Rylj_rWZPS3_I4eScnJHl-BzZc ";

  const getOrders = () => {
    axios
      .get("https://api.hadyacrm.uz/api/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setOrder(data.innerData);
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, [token]);

  // get by order id
  const getById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.hadyacrm.uz/api/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderById(res.data.innerData.products);
      toggleDrawer();
      setLoading(false);
      //   console.log(res.data.innerData.products);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  //

  function formatCurrencyUZS(amount) {
    const formatter = new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  }

  useOutsideClick(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    socket.emit("/rooms");
    socket.on("/rooms", (data) => {
      getOrders();
    });
  }, []);

  return (
    <div>
      {loading && (
        <div className="modalorder">
          <span className="loader-app" />
        </div>
      )}
      {isOpen && (
        <div className="modalorder">
          <div className="modal-body" ref={wrapperRef}>
            {orderById.map((item) => {
              return (
                <div className="modalorder__item">
                  <div className="modalorder__item__img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="modalorder__item__info">
                    <h3>{item.product_name}</h3>
                    <p>
                      {formatCurrencyUZS(
                        item.product_price * item.product_quantity
                      )
                        ?.replace("UZS", "")
                        ?.trimStart() + " "}
                      UZS
                    </p>
                    <p>{item.product_type}</p>
                    <p>{item.product_unit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="order">
        <table>
          <tr>
            <th>Joy Raqami</th>
            <th>Afitsant Ismi</th>
            <th>Xisob Sumasi</th>
            <th>Zakas olingan vaqti</th>
            <th>Zakasni ko'rish</th>
          </tr>
          {order.map((item) => {
            return (
              <tr>
                <td>{item.room_name}</td>
                <td>{item.afitsant_name}</td>
                <td>{item.total_price}</td>
                <td>{item.created_at}</td>
                <td>
                  <button
                    onClick={() => {
                      getById(item.id);
                    }}
                  >
                    korish{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M17.4 17.6C15.7 19.3 13.5 20 12 20S8.3 19.3 6.6 17.6M12 4C7 4 2.8 9 2.8 12s4.2 8 9.2 8 9.2-4 9.2-8-4.2-8-9.2-8z" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
