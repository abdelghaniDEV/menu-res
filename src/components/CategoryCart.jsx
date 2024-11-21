import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCategory from "./EditCategory";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCategories } from "../Redux/slices/categories.slice";
import { toast } from "sonner"

export default function CategoryCart({ category , index }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  // const [filterByCategory , setFilterByCategory] = useState([]);
  const products = useSelector((state) => state.products)

  const dataCategory = new Date(category.createdAt).toDateString();
  


  const handleDelete = async () => {
    // Delete category from Redux state and API
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/categories/${category._id}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      console.log("delete category successfully", response.data);
      dispatch(fetchCategories());
      toast("Delete successfully")
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    // setOpenDelete(false);
  };



  return (
    <TableRow className="text-[18px] ">
      <TableCell className="">#{index + 1}</TableCell>
      <TableCell className="">{category?.name}</TableCell>
      <TableCell className=""> Meal</TableCell>
      <TableCell className="">{dataCategory}</TableCell>
      <TableCell className="flex gap-3 ">
        <Button className="bg-slate-200" onClick={() => setOpenEdit(true)}>
          <Link className="flex gap-2">
            <i className="bx bx-edit text-[20px]"></i>
            <span>Edit</span>
          </Link>
        </Button>
        <Button className="bg-red-300" onClick={() => setOpenDelete(true)}>
          <i className="bx bx-trash text-[20px]"></i>
          <span>Delete</span>
        </Button>
      </TableCell>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-[600]">
              Edit Meal
            </DialogTitle>
            <div>
              <EditCategory category={category} setOpenEdit={setOpenEdit} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-[500]">
              Delete category
            </DialogTitle>
            <div className="text-[16px]">
              Are you sure you want to delete this meal?
              <div className="flex gap-3 pt-3">
                <Button className=" bg-red-300" onClick={handleDelete}>
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
