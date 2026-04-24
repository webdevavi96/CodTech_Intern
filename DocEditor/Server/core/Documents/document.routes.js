import { Router } from "express";
import { getDocuments, getDocument } from "./Document.controller.js";

const router = Router();

router.route("/getDoc/:documentId", getDocument);
router.route("/getDocs", getDocuments);

export default router;
