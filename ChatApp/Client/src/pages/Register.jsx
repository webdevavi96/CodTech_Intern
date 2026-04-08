import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

function Register() {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F3F4F5] px-4 py-10">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="bg-[#3A04FF] px-6 py-4 text-white">
          <h1 className="text-xl font-semibold">User Registration</h1>
          <p className="text-sm opacity-80">Create your account securely</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
              <input
                {...register('username')}
                type="text"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
              <input
                {...register('name')}
                type="text"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
            <input
              {...register('email')}
              type="email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative">
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                {...register('password')}
                type={show ? 'text' : 'password'}
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

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                type={show ? 'text' : 'password'}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute top-9 right-3 text-gray-500"
              >
                {show ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center justify-between gap-4 pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <NavLink
                to="/login"
                className="cursor-pointer font-medium text-[#3A04FF] hover:underline"
              >
                Log In
              </NavLink>
            </p>

            <button
              type="submit"
              className="rounded-md bg-[#009DFF] px-8 py-2 font-medium text-white transition hover:bg-blue-600"
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
