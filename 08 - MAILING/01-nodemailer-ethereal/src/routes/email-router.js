import { Router } from "express";
import { sendMailEth } from "../controllers/email-controller.js";

const router = Router();

router.post("/send", sendMailEth);

export default router;
