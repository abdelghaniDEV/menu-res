import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import pic01 from "../assets/pic-1@4xn.png";
import meal01 from "../assets/meal02.jpg";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProduct from "./EditProduct";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/slices/products.slice";


export default function ProductCart({ product, index }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  const dataProduct = new Date(product.createdAt).toDateString();


  const handelDelete = async () => {
    // delete product
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${product._id}`,
        {
          headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              },
        }
      );
      console.log("Product deleted successfully", response.data);
      setOpenDelete(false);
      dispatch(fetchProducts());
      // refresh the product list
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };
  return (
    <TableRow className="md:text-[16px]  ">
      <TableCell className="hidden md:table-cell border-r-[1px] w-10 h-10">
        <img src={product.image} className=" rounded-full" />
      </TableCell>
      <TableCell className="flex gap-3 items-center">
        <span>{product.name}</span>
      </TableCell>
      <TableCell className="  gap-2 items-center">
        <span className="flex gap-1 items-center">
          <i className="bx bx-shekel text-[20px]"></i>
          {product.price}
        </span>
      </TableCell>
      <TableCell className="">{product.category?.name} / {product.subCategory}</TableCell>
      <TableCell className="hidden md:table-cell">{dataProduct}</TableCell>
      <TableCell className="flex gap-3 items-center ">
        <button
          className="bg-slate-200 py-1 px-2 rounded-[4px] flex items-center"
          onClick={() => setOpenEdit(true)}
        >
          <i className="bx bx-edit text-[20px]"></i>
          <span className="hidden md:block">Edit</span>
        </button>
        <button
          className="bg-red-300 py-1 px-2 rounded-[4px] flex items-center"
          onClick={() => setOpenDelete(true)}
        >
          <i className="bx bx-trash text-[20px] "></i>
          <span className="hidden md:block">Delete</span>
        </button>
      </TableCell>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="md:w-[80%] w-full py-4">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-[600]">
              Edit Meal
            </DialogTitle>
            <div>
              <EditProduct product={product} setOpenEdit={setOpenEdit} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-[500]">
              Delete Meal
            </DialogTitle>
            <div className="text-[16px]">
              Are you sure you want to delete this meal?
              <div className="flex gap-3 pt-3">
                <Button className=" bg-red-300" onClick={handelDelete}>
                  Delete
                </Button>
                <Button
                  className="bg-slate-200"
                  onClick={() => setOpenDelete(false)}
                >
                  Cencele
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
}
