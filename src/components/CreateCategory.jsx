import React, { useState } from "react";
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner"
import { fetchCategories } from "../Redux/slices/categories.slice";

export default function CreateCategory({setOpenCreate}) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const categories = useSelector((state) => state.categories)
  const dispatch = useDispatch()

  const checkData = () => {
    let isValid = true;
    const inputName = document.getElementById("input-name");
    // Add validation checks here
    if(name === "" ){
      setErrorMsg("name is required");
      isValid = false;

      inputName.classList.add("border-red-500");
    }else if (categories.find((category) => category.name === name)) {
      console.log(name)
      setErrorMsg("Category name already exists");
      isValid = false;
      inputName.classList.add("border-red-500");
    }else {
      setErrorMsg("");
      inputName.classList.remove("border-red-500");
    }

    return isValid;
  }
  const handelAddCategory = async () => {
    checkData();
    const inputName = document.getElementById("input-name");
    if (checkData()) {
      setErrorMsg("");
      inputName.classList.remove("border-red-500");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/categories`,
          {
            name,
          }, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              },
          }
          
        );
        toast("Category added successfully")
        setOpenCreate(false)
        dispatch(fetchCategories())
        console.log("added category successfully", response.data);
      } catch (error) {
        console.error("Error adding category:", error);
        // Add error handling here
      }
    }
  };
  return (
    <div className="relative">
      {/* Add form inputs for product data */}
      <div className="grid grid-cols-2  gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[15px] font-[500] text-[#474B4F]">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              placeholder="Name of product"
              id="input-name"
            />
            <span className="text-[14px] text-red-500" id="err-name">
              {errorMsg}
            </span>
          </div>
          <div className="flex  gap-2">
            <Button
              onClick={handelAddCategory}
              className="bg-[#4CAF50] p-2 rounded-[5px] text-white hover:bg-[#45a049] transition-all duration-300 ease-in-out"
            >
              Create Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
