import React from "react";
import { useForm } from "react-hook-form";

function Contact() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-[#F3F4F5] min-h-[calc(100vh-80px)] flex items-center justify-center px-6 md:px-16 py-10">
      <div className="w-full max-w-xl bg-white shadow-md border border-gray-200 rounded-xl">
        <div className="bg-[#3A04FF] text-white px-6 py-4 rounded-t-xl">
          <h1 className="text-xl font-semibold">Contact Us</h1>
          <p className="text-sm opacity-80">We’d love to hear from you</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              {...register("message")}
              rows="4"
              placeholder="Write your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#009DFF] text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
