import axios from "axios";
import React, { useState, useEffect } from "react";
import "./css.css";

export default function Afitsant() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(null);

  // toast message

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMmFlOSIsImZ1bGxuYW1lIjoiQmVrem9kIiwicGhvbmUiOjk5ODkzOTA3NTM1MCwicGFzc3dvcmQiOiI4YzY5NzZlNWI1NDEwNDE1YmRlOTA4YmQ0ZGVlMTVkZmIxNjdhOWM4NzNmYzRiYjhhODFmNmYyYWI0NDhhOTE4IiwiYmFsYW5jZSI6MCwiYWN0aXZlIjowLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyNC0wMi0wMVQxNTo0MTozMC4wMDBaIiwidXBkYXRlZF9hdCI6bnVsbCwiaWF0IjoxNzA3MTYyMjgzLCJleHAiOjE3MDk3NTQyODN9.C23tcebnuYTWKjBl6Rylj_rWZPS3_I4eScnJHl-BzZc"; // Tokeningizni bu yerga joylang

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.hadyacrm.uz/api/afitsant",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInventory(response.data.innerData);
        setLoading(false); // So'rov bajarildi, loadingni false qilamiz
        setIsLoading(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Xatolik sodir bo'ldi, loadingni false qilamiz
        setIsLoading(null);
      }
    };

    fetchData();
  }, [token]);

  const active = async (id) => {
    setIsLoading(id);
    try {
      await axios.patch(
        `https://api.hadyacrm.uz/api/afitsant/activate/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInventory(
        inventory.map((inv) => {
          if (inv?.id === id) {
            return { ...inv, active: inv.active === 0 ? 1 : 0 };
          }
          return inv;
        })
      );
      setIsLoading(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(null);
    }
  };

  const deleteAfitsant = async (id) => {
    setIsLoading(id);

    try {
      await axios.delete(`https://api.hadyacrm.uz/api/afitsant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInventory(inventory.filter((inv) => inv?.id !== id));
      setIsLoading(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(null);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="cards  ">
      {inventory
        .sort((a, b) => a.active - b.active)
        .map((item) => (
          <div
            key={item.id}
            className={`card ${item.id === isLoading ? "loading" : ""} `}
            style={{ width: "18rem" }}
          >
            <h5 className="card-title"> ISMI:{item.fullname}</h5>
            <p className="card-text">Xisobi: {item.balance}</p>
            <p className="card-text">Telefon: {item.phone}</p>

            <div className="btn">
              <button
                onClick={() => {
                  active(item.id);
                }}
                style={
                  item.active === 1
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "#bbb" }
                }
                className="btn btn-primary"
                disabled={isLoading}
              >
                {item.active === 1 ? "Active" : "Inactive"}
              </button>

              <button
                id="delete"
                onClick={() => {
                  deleteAfitsant(item.id);
                }}
                disabled={isLoading}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
