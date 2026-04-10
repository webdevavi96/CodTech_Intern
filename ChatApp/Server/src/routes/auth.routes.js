import { Router } from "express";
import { login, logOut, register, verifyOtpAndRegister, profile } from "../controllers/User.controller.js";
import {authJwt} from "../middlewares/auth.midleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/verify_otp").post(verifyOtpAndRegister);
router.route("/login").post(login);
router.route("/logut", authJwt).post(logOut);
router.route("/profile", authJwt).get(profile);

export default router;