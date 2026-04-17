import React from "react";
import { useForm } from "react-hook-form";

function Contact() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F3F4F5] px-6 py-10 md:px-16">
      <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="rounded-t-xl bg-[#3A04FF] px-6 py-4 text-white">
          <h1 className="text-xl font-semibold">Contact Us</h1>
          <p className="text-sm opacity-80">We’d love to hear from you</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6 md:p-8">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
            <textarea
              {...register("message")}
              rows="4"
              placeholder="Write your message..."
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#009DFF] py-2 font-medium text-white transition hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
