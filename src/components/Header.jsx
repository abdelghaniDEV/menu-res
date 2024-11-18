import React from "react";
import logo from "../assets/logo04.png"
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-5">
        <img src={logo} alt="Logo" className="h-[40px] w-[40px] rounded-full" />
        <h1 className=" text-[20px] md:text-[30px] font-[600] ">Dashboard Menu</h1>
      </div>
      <div className="">
        <ul className="flex gap-3 text-[18px] font-[500]">
          <Link to={'/dashboard'} className="flex items-center gap-1">
            <i class="bx bxs-shopping-bag-alt text-[30px]"></i>
            <span className="hidden md:block">Products</span>
          </Link>
          <Link to={'categories'} className="flex items-center gap-1">
            <i class="bx bx-grid-alt text-[30px]"></i>
            <span className="hidden md:block">Categories</span>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
