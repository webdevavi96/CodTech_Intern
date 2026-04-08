export const generateOtp = () => {
  const otp = Math.random().toFixed(3) * 100000;
  return otp;
};
