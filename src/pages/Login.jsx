import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

import { Button } from "../components/ui/button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
            email,
            password,
        })
        console.log("login success", response.data);
        const token = response.data
        localStorage.setItem("tokenMenu", token);
        navigate("/dashboard")
    }catch (error) {
        setError("Invalid email or password");
        console.error("login error", error);
    }
  }


  return (
    <div className=" w-[100%] h-[100vh]">
      <Card className="login-container  shadow-sm rounded-[20px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 ">
        <div className="flex flex-col items-center">
          <h1 className="text-[40px] font-[600]">
            Welcome <span className="text-[]">Back</span>
          </h1>
          <p className="md:text-[20px]">
            Hay, Entre your details to get sign in{" "}
          </p>
          <div className="flex flex-col text-[15px] font-[600]">
            <span>Email : public@gmail.com</span>
            <span>Password : 12345678</span>
          </div>
        </div>
        <form
            onSubmit={handleLogin}
          className="w-[300px] mt-6 flex flex-col gap-[20px]"
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="email" className="text-[#aba9a9]">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:outline-[#f2b78d] "
            />
          </div>
          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="Password" className="text-[#aba9a9]">
              Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:outline-[#f2b78d] "
            />
            <i class="bx bx-show absolute right-2 text-[20px] top-[35px] cursor-pointer" onClick={() => setShowPassword(!showPassword)}></i>
          </div>

          <Button
            type="submit"
            className="bg-[#FEC887] text-black text-[15px] font-semibold  hover:bg-[] flex items-center gap-1 "
          >
            Sign in{" "}
          </Button>
        </form>
        {error && <p className="text-[red] text-[15px] pt-2">{error}</p>}
      </Card>
    </div>
  );
}
