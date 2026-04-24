import { register, login, logout, getMe } from "./User.controller.js";
import { Router } from "express";

const router = Router();

router.route("/register", register);
router.route("/login", login);
router.route("/logout", logout);
router.route("/me", getMe);

export default router;
