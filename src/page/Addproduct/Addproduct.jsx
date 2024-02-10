import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./css.css";

export default function Addproduct() {
  // img url
  const [imageUrl, setImageUrl] = useState(null);
  const [product, setProduct] = useState([]);
  // modal
  const [isOpen, setIsOpen] = useState(false);

  // onchange img
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMmFlOSIsImZ1bGxuYW1lIjoiQmVrem9kIiwicGhvbmUiOjk5ODkzOTA3NTM1MCwicGFzc3dvcmQiOiI4YzY5NzZlNWI1NDEwNDE1YmRlOTA4YmQ0ZGVlMTVkZmIxNjdhOWM4NzNmYzRiYjhhODFmNmYyYWI0NDhhOTE4IiwiYmFsYW5jZSI6MCwiYWN0aXZlIjowLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyNC0wMi0wMVQxNTo0MTozMC4wMDBaIiwidXBkYXRlZF9hdCI6bnVsbCwiaWF0IjoxNzA3MTYyMjgzLCJleHAiOjE3MDk3NTQyODN9.C23tcebnuYTWKjBl6Rylj_rWZPS3_I4eScnJHl-BzZc ";

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      img: "",
      name: "",
      price: "",
      type: "",
    },
  });

  const handleCreate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("img", data.img[0]);
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("type", data.type);
      formData.append("unit", data.unit);
      formData.append("department", data.department);

      const response = await axios.post(
        "https://api.hadyacrm.uz/api/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsOpen(false);
      reset();
      setImageUrl(null);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = (data) => handleCreate(data);

  const toggleDrawer = () => setIsOpen(!isOpen);

  //  get all product
  const getAllProduct = async () => {
    try {
      const response = await axios.get("https://api.hadyacrm.uz/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(response.data.innerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://api.hadyacrm.uz/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllProduct();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // delete product confirm
  const deleteProductConfirm = async (id) => {
    const confirm = window.confirm("O'chirishni tasdiqlaysizmi?");
    console.log(confirm);
    if (confirm) {
      deleteProduct(id);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
      <button id="togleopenbtn" onClick={toggleDrawer}>
        Maxsulot qo'shish
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
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </button>
      {isOpen && (
        <div className=" maxsulot ">
          <h1>Maxsulot qo'shish</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span className="imgdropper">
                {imageUrl ? (
                  <div>
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                ) : (
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
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                )}
                Maxsulot rasmi
              </span>
              <input
                hidden
                type="file"
                placeholder="Maxsulot rasmi"
                {...register("img")}
                onChange={(e) => {
                  handleFileChange(e);

                  register("img").onChange(e);
                }}
                accept="image/*"
              />
            </label>
            <input
              type="text"
              placeholder="Maxsulot nomi"
              {...register("name")}
            />
            <input
              type="text"
              placeholder="Maxsulot narxi"
              {...register("price")}
            />
            <input
              type="text"
              placeholder="Maxsulot turi"
              {...register("type")}
            />

            <select {...register("unit", { required: true })}>
              <option value="dona">dona</option>
              <option value="kg">kg</option>
              <option value="litr">litr</option>
              <option value="paket">paket </option>
              <option value="quti">quti </option>
              <option value="gr">gr </option>
              <option value="pors">pors </option>
            </select>

            <select {...register("department", { required: true })}>
              <option value="shashlik">Shashlik</option>
              <option value="fast_food">Fast-Food</option>
              <option value="tea_house">Choyxona</option>
              <option value="cakes">Tortlar + Shirinliklar</option>
            </select>

            <button type="submit">Qo'shish</button>
          </form>
        </div>
      )}

      <div className="getallproduct">
        {product?.map((item) => {
          return (
            <div className="productcard" key={item.id}>
              <img src={item.img} alt="product" />
              <h3>{item.name}</h3>
              <div className="price-type">
                <p>{item.price} so'm</p>
                <p> turi {item.type}</p>
              </div>
              <button
                onClick={() => {
                  deleteProduct(item.id);
                  deleteProductConfirm(item.id);
                }}
                id="delete"
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
