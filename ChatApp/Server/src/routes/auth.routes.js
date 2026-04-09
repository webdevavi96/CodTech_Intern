import { Router } from "express";
import { login, logOut, register, verifyOtpAndRegister } from "../controllers/User.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/logut").post(logOut);
router.route("/register").post(register);
router.route("/verify_otp").post(verifyOtpAndRegister);

export default router;