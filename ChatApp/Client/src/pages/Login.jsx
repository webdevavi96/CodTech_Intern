import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../contexts/authContext";
import { loginUser } from '../auth/authReq';

function Login() {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const { login } = useContext(AuthContext)

  const onSubmit = async (data) => {
    if (!data) return;

    const res = await loginUser(data);

    if (res.status !== 200) return;

    console.log(res)
    // login(res.data)

  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F3F4F5] px-6 py-10 md:px-16">
      <div className="flex w-full max-w-md flex-col justify-center rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="rounded-t-xl bg-[#3A04FF] px-6 py-4 text-white">
          <h1 className="text-xl font-semibold">User Login</h1>
          <p className="text-sm opacity-80">Access your account securely</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6 md:p-8">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register('password')}
              type={show ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute top-9 right-3 text-gray-500"
            >
              {show ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#009DFF] py-2 font-medium text-white transition hover:bg-blue-600"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <NavLink
              to="/register"
              className="cursor-pointer font-medium text-[#3A04FF] hover:underline"
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
