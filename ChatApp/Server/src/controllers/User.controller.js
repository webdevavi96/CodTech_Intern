import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/User.models.js';
import { sendOtp } from '../config/config.js';
import { client } from '../config/redis.conf.js';
import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'None' : 'Lax',
  path: '/',
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({
      message: 'Wrong credentials!',
      status: 401,
    });

  const user = await User.findOne({ email: email });

  if (!user)
    return res.status(404).json({
      message: 'User not found!',
    });

  const isPasswordCorrect = user.isPasswordCorrect(password);

  if (!isPasswordCorrect) return res.status(401).json({ message: 'Incorrect password' });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const sanitisedUser = user.toObject();
  delete sanitisedUser.password;

  await client.set(user.username, JSON.stringify({ sanitisedUser }), {
    EX: 1800,
    NX: true,
  });

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json({
      message: 'login successfulle',
      success: true,
      data: sanitisedUser,
    });
});

export const logOut = asyncHandler(async (req, res) => {
  const user = req.body;
  await User.findByIdAndUpdate(user._id, { $unset: { refreshToken: '' } }, { new: true });

  await client.del(user.username);

  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json({
      message: 'Log out successfull!',
      data: {},
      success: true,
    });
});

export const register = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log(data);

  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password)
    return res.status(404).json({
      message: 'All; fields are reqired!',
      data: {},
      success: false,
    });

  const { isSent, otp } = await sendOtp(email);

  if (!isSent)
    return res.status(501).json({
      message: 'Internal server error!',
      success: false,
    });

  const user = {
    username: username,
    fullname: name,
    email: email,
    password: password,
  };

  await client.set(username, JSON.stringify({ user: user, otp }), {
    EX: 300,
    NX: true,
  });

  return res.status(200).json({
    message: 'OTP sent successfully!',
    data: username,
    success: true,
  });
});

export const verifyOtpAndRegister = asyncHandler(async (req, res) => {
  const { otpInput, username } = req.body;

  if (!username || !otpInput) {
    console.log(username, otpInput);
    return res.status(401).json({ message: 'Invalid input' });
  }

  const cachedUser = await client.get(username);

  if (!cachedUser)
    return res.status(400).json({
      message: 'OTP Expired',
      success: false,
    });

  const { user, otp } = await JSON.parse(cachedUser);
  console.log(user, otp);

  if (otp != parseInt(otpInput))
    return res.status(400).json({
      message: 'Invalid OTP',
      success: false,
    });

  await client.del(username);

  const createdUser = await User.create(user);

  if (!createdUser)
    return res.status(501).json({
      message: 'Internal server error! Please try again later.',
      success: false,
    });

  return res.status(201).json({
    message: 'Account created succfully.',
    success: true,
  });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookie.refreshToken;

  if (!token) return res.status(401).json({ message: 'Un-Authorized' });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_KEY);

    const newAccessToken = jwt.sign({ _id: decodedToken._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '15m',
    });

    return res.cookie('accessToken', newAccessToken, cookieOptions).json({ success: true });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});

export const getMe = asyncHandler(async (req, res) => {
  try {
    let decodedToken;

    try {
      decodedToken = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);
    } catch {
      // If access is token expired, we will use refresh token to generate a new access token

      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) throw new Error();

      const decodedRefreshToken = jwt.decode(refreshToken, process.env.JWT_REFRESH_KEY);

      const newAccessToken = jwt.sign(
        { _id: decodedRefreshToken._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '15m' }
      );

      res.cookie('accessToken', newAccessToken, cookieOptions);
      decodedToken = decodedRefreshToken;
    }

    let user;

    user = await client.get(decodedToken.username);

    if (!user) {
      user = await User.findById(decodedToken._id).select('-password');
      await client.set(username, JSON.stringify({ user }), {
        EX: 1800,
        NX: true,
      });
    }

    return res.status(200).json({ message: 'success', success: true, user: user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});
