import { Router } from "express";
import {
  login,
  logOut,
  register,
  verifyOtpAndRegister,
  refreshAccessToken,
  getMe,
} from "../controllers/User.controller.js";
import { authJwt } from "../middlewares/auth.midleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/verify_otp").post(verifyOtpAndRegister);
router.route("/refresh_access_token").get(refreshAccessToken);
router.route("/login").post(login);
router.route("/logut", authJwt).post(logOut);
router.route("/me", authJwt).get(getMe);

export default router;
