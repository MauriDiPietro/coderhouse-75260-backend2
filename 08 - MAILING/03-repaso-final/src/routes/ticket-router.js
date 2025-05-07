import { Router } from "express";
import { passportCall } from "../middlewares/passport-call";
import { ticketController } from "../controllers/ticket-controller";

const router = Router();

router.post("/purchase", [passportCall('jwt', { session: false })], ticketController.generateTicket);

export default router;
