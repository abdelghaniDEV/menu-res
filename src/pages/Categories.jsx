import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryCart from "../components/CategoryCart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../components/ui/button";
import CreateCategory from "../components/CreateCategory"
import { useSelector } from "react-redux";

export default function Categories() {
  const [openCreate, setOpenCreate] = useState(false);
  const categories = useSelector((state) => state.categories)

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] md:text-[45px] font-[500] py-3">List Categories</h1>
        <Button
          className="border-black border-2"
          onClick={() => setOpenCreate(true)}
        >
          <i className="bx bx-plus text-[20px]"></i>
          <span>Add Category</span>
        </Button>
      </div>
      <div>
        <Table className="border">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[18px]">
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Meals</TableHead>
              <TableHead className=" ">Date</TableHead>
              <TableHead className=" ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((categ , index) => {
              return <CategoryCart category={categ} index={index} key={categ._id} />
            })}
            
          </TableBody>
        </Table>
      </div>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle  className="text-[30px] font-[600]">Create Category</DialogTitle>
            <div >
               <CreateCategory setOpenCreate={setOpenCreate} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
