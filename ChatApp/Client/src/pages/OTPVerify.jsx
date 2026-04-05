import React from "react";
import { useForm } from "react-hook-form";

function OTPVerify() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("OTP Verified:", data);
    alert("OTP Submitted!")
    reset();
  };

  return (
    <div className="h-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verify OTP
          </label>

          <input
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Enter a valid 6-digit OTP",
              },
            })}
            type="text"
            maxLength={6}
            inputMode="numeric"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
          />

          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div className="flex justify-center items-center mt-4">
          <button className="px-5 py-1.5 rounded-full font-medium transition bg-blue-600 text-white hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OTPVerify;