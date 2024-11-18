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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductCart from "../components/ProductCart";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import CreateProducts from "../components/CreateProducts";

export default function Products() {
  const [openCreate, setOpenCreate] = useState(false);
  const products = useSelector((state) => state.products);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] md:text-[45px] font-[500] py-3">List Meals</h1>
        <Button className="border-black border-2" onClick={() => setOpenCreate(true)}>
          <i class="bx bx-plus text-[20px]"></i>
          <span className="hidden md:block">Add Meal</span>
        </Button>
      </div>
      <div>
        <Table className="border">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="text-[18px]">
              <TableHead>Invoc</TableHead>
              {/* <TableHead>Product</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>category</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className=" ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <ProductCart key={index} product={product} index={index} />
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="md:w-[80%] w-full ">
          <DialogHeader>
            <DialogTitle  className="text-[30px] font-[600]">Create Meal</DialogTitle>
            <DialogDescription >
               <CreateProducts setOpenCreate={setOpenCreate} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
