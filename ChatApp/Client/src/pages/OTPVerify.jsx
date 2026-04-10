import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { verifyOtp } from '../auth/authReq';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

function OTPVerify() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { username } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!data) return;
    if (!username) console.log("null value", username)
    const res = await verifyOtp(data, username);
    if (res.status !== 201) return;

    navigate("/login");
    reset();
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Verify OTP</label>

          <input
            {...register('otpInput', {
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
            autoFocus="true"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#009DFF] focus:outline-none"
          />

          {errors.otpInput && <p className="mt-1 text-sm text-red-500">{errors.otpInput.message}</p>}
        </div>

        <div className="mt-4 flex items-center justify-center">
          <button
            disabled={isSubmitting}
            className="rounded-full bg-blue-600 px-5 py-1.5 font-medium text-white transition hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OTPVerify;
