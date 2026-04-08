import React from 'react';
import { useForm } from 'react-hook-form';

function OTPVerify() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('OTP Verified:', data);
    alert('OTP Submitted!');
    reset();
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Verify OTP</label>

          <input
            {...register('otp', {
              required: 'OTP is required',
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'Enter a valid 6-digit OTP',
              },
            })}
            type="text"
            maxLength={6}
            inputMode="numeric"
            placeholder="Enter OTP"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
          />

          {errors.otp && <p className="mt-1 text-sm text-red-500">{errors.otp.message}</p>}
        </div>

        <div className="mt-4 flex items-center justify-center">
          <button className="rounded-full bg-blue-600 px-5 py-1.5 font-medium text-white transition hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OTPVerify;
