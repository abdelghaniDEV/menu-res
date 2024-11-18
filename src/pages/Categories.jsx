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
        <h1 className="text-[45px] font-[500] py-3">List Categories</h1>
        <Button
          className="border-black border-2"
          onClick={() => setOpenCreate(true)}
        >
          <i class="bx bx-plus text-[20px]"></i>
          <span>Add Category</span>
        </Button>
      </div>
      <div>
        <Table className="border">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="text-[18px]">
              <TableHead>Invoc</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Meals</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className=" ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((categ) => {
              return <CategoryCart category={categ} />
            })}
            
          </TableBody>
        </Table>
      </div>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="]">
          <DialogHeader>
            <DialogTitle  className="text-[30px] font-[600]">Create Category</DialogTitle>
            <DialogDescription >
               <CreateCategory setOpenCreate={setOpenCreate} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
