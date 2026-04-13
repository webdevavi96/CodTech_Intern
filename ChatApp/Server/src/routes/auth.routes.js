import { Router } from 'express';
import {
  login,
  logOut,
  register,
  verifyOtpAndRegister,
  getMe,
} from '../controllers/User.controller.js';
import { authJwt } from '../middlewares/auth.midleware.js';

const router = Router();

router.route('/register').post(register);
router.route('/verify_otp').post(verifyOtpAndRegister);
router.route('/login').post(login);
router.route('/logout').post(logOut);
router.route('/me').get(authJwt, getMe);

export default router;
