import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-[#F3F4F5] min-h-[calc(100vh-80px)] flex items-center justify-center px-6 md:px-16 py-10">
      <div className="w-full max-w-md bg-white shadow-md border border-gray-200 flex flex-col justify-center rounded-xl">
        <div className="bg-[#3A04FF] text-white px-6 py-4 rounded-t-xl">
          <h1 className="text-xl font-semibold">User Login</h1>
          <p className="text-sm opacity-80">Access your account securely</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {show ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#009DFF] text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <NavLink
              to="/register"
              className="text-[#3A04FF] cursor-pointer hover:underline font-medium"
            >
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
