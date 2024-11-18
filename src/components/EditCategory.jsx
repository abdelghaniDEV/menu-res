import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/slices/categories.slice";

export default function EditCategory({category , setOpenEdit}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState("");
  const [name , setName] = useState("")
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories)

  useEffect(() => {
    setName(category.name)
  },[category])

  const checkData = () => {
    let isValid = true;
    const inputName = document.getElementById("input-name");
    // Add validation checks here
    if(name === "" ){
      setErrorMsg("name is required");
      isValid = false;

      inputName.classList.add("border-red-500");
    }else if (categories.filter((category) => category.name === name)) {
      setErrorMsg("Category name already exists");
      isValid = false;
      inputName.classList.add("border-red-500");
    }else {
      setErrorMsg("");
      inputName.classList.remove("border-red-500");
    }
    return isValid;
  }

  // update categories
  const handleUpdate = async () => {
    checkData();
    if (checkData()) {
      return console.log("data is not valid");
    }
    // Update category in Redux state and API
    const updateData = {
      name,
    }
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/categories/${category._id}`,
        updateData,{
          headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              },
        }
      );
      console.log("update category successfully", response.data);
      dispatch(fetchCategories());
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
    // setOpenEdit(false);
  };
  return (
    <div className="relative">
      <div className="flex  justify-between">
        <div className="flex gap-2"></div>
      </div>
      {/* Add form inputs for product data */}
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[15px] font-[500] text-[#474B4F]">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              placeholder="Name of product"
              id="input-name"
            />
            <span className="text-[14px] text-red-500" id="err-name"></span>
          </div>
          <div className="flex  gap-2">
            <Button onClick={handleUpdate} className="bg-[#4CAF50] p-2 rounded-[5px] text-white hover:bg-[#45a049] transition-all duration-300 ease-in-out">
              Create Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
