import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Register() {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-[#F3F4F5] min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-[#3A04FF] text-white px-6 py-4">
          <h1 className="text-xl font-semibold">User Registration</h1>
          <p className="text-sm opacity-80">Create your account securely</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                {...register("password")}
                type={show ? "text" : "password"}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type={show ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {show ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center justify-between gap-4 pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-[#3A04FF] font-medium cursor-pointer hover:underline"
              >
                Log In
              </NavLink>
            </p>

            <button
              type="submit"
              className="bg-[#009DFF] text-white px-8 py-2 rounded-md font-medium hover:bg-blue-600 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
