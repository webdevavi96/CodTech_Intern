import { Router } from "express";
import { login, logOut, register, verufyOtpAndRegister } from "../controllers/User.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("logut").post(logOut);
router.route("register").post(register);
router.route("verify_otp").post(verufyOtpAndRegister);

export default router;