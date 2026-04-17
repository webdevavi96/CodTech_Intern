import { Router } from "express";
import { getChat, getUsers } from "../controllers/Message.controller.js";
import { authJwt } from "../middlewares/auth.midleware.js";

const router = Router();

router.route("/users").get(authJwt, getUsers);
router.route("/:userId").get(authJwt, getChat);

export default router;
