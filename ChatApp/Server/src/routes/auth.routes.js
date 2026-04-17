import { Router } from "express";
import {
  login,
  logOut,
  register,
  verifyOtpAndRegister,
  getMe,
  uploadAvatar,
  updateDetails,
} from "../controllers/User.controller.js";
import { authJwt } from "../middlewares/auth.midleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/verify_otp").post(verifyOtpAndRegister);
router.route("/login").post(login);
router.route("/logout").post(logOut);
router.route("/me").get(authJwt, getMe);
router
  .route("/uploadAvatar")
  .post(authJwt, upload.single("avatar"), uploadAvatar);
router.route("/update-profile").post(authJwt, updateDetails);

export default router;
