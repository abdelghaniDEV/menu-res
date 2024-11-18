import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/slices/products.slice";
import { toast } from "sonner"

export default function CreateProducts({ setOpenCreate }) {
  const [image, setImage] = useState("");
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  console.log(categories);
  const checkData = () => {
    let isValid = true;

    {
      /* validate name */
    }
    if (data.name === "") {
      const inputName = document.getElementById("input-name");
      inputName.classList.add("border-red-500");
      setErrorMsg((prev) => ({
        ...prev,
        name: "name is required",
      }));
      isValid = false;
    } else {
      const inputName = document.getElementById("input-name");
      inputName.classList.remove("border-red-500");
      setErrorMsg((prev) => ({
        ...prev,
        name: "",
      }));
    }

    {
      /* validate price */
    }
    if (data.price === "") {
      const inputPrice = document.getElementById("input-price");
      inputPrice.classList.add("border-red-500");
      setErrorMsg((prev) => ({
        ...prev,
        price: "price is required",
      }));
      isValid = false;
    } else {
      const inputPrice = document.getElementById("input-price");
      inputPrice.classList.remove("border-red-500");
      setErrorMsg((prev) => ({
        ...prev,
        price: "",
      }));
    }

    {
      /* validate category */
    }
    if (data.category === "") {
      setErrorMsg((prev) => ({
        ...prev,
        category: "category is required",
      }));
      isValid = false;
    } else {
      setErrorMsg((prev) => ({
        ...prev,
        category: "",
      }));
    }

    {
      /* validate image */
    }
    if (data.image === "") {
      const inputImage = document.getElementById("input-image");
      inputImage.classList.add("border-red-500");
      setErrorMsg((prev) => ({
        ...prev,
        image: "image is required",
      }));
      isValid = false;
    } else {
      const inputImage = document.getElementById("input-image");
      inputImage.classList.remove("border-red-500");
      setErrorMsg((prev) => ({
        ...prev,
        image: "",
      }));
    }

    return isValid;
  };

  const handelSubmitted = async (e) => {
    e.preventDefault();

    checkData();

    if (checkData()) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("image", data.image);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        console.log("Upload successful:", response.data);
        setOpenCreate(false);
        dispatch(fetchProducts());
        toast("Meal added successfully")
      } catch (error) {
        console.log("Error uploading", error);
      }
    }
  };

  return (
    <div>
      {/* Add form inputs for product data */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[15px] font-[500] text-[#474B4F]">
              Name Meal
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              placeholder="Name of product"
              id="input-name"
            />
            <span className="text-[14px] text-red-500" id="err-name">
              {errorMsg.name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[15px] font-[500] text-[#474B4F]">
              Price
            </label>
            <input
              type="text"
              value={data.price}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              className="w-[120px] border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              placeholder="Price"
              id="input-price"
            />
            <span className="text-[14px] text-red-500" id="err-name">
              {errorMsg.price}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[15px] font-[500] text-[#474B4F]">
              Description
            </label>
            <textarea
              type="text"
              value={data.description}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full pt-2 border h-[100px] text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              placeholder="Name of product"
              id="input-name"
            />
            <span className="text-[14px] text-red-500" id="err-name">
              {errorMsg.description}
            </span>
          </div>
          <div>
            <Select
              onValueChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  category: e,
                }))
              }
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((cate) => (
                    <SelectItem value={cate._id}>{cate.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-[14px] text-red-500" id="err-name">
              {errorMsg.category}
            </span>
          </div>
          <div className="flex  gap-2">
            <Button
              onClick={(e) => handelSubmitted(e)}
              className="bg-[#4CAF50] py-2 px-4 text-[18px] rounded-[5px] text-white hover:bg-[#45a049] transition-all duration-300 ease-in-out"
            >
              Create Meal
            </Button>
          </div>
        </div>
        <div className="bg-[#F9F9F9] p-5 rounded-[10px] h-[200px] ">
          <h1 className=" text-[20px] font-[600] mb-3">upload images</h1>
          <div className="flex items-center gap-3">
            <div>
              <label
                id="input-image"
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-[150px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#EEEEEE]  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <i className="bx bx-cloud-upload text-[#F5CAAB] text-[40px]"></i>
                  <p>Upload</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                />
              </label>
              <span className="text-[14px] text-red-500" id="err-image">
                {errorMsg.image}
              </span>
            </div>
            <div>
              {data.image && (
                <div className=" border-2 border-[#F5CAAB] rounded-[10px] p-1 ">
                  <img
                    src={URL.createObjectURL(data.image)}
                    className="h-[100px] w-full cursor-pointer"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        image: "",
                      }))
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
