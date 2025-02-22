import { Router } from "express";
import PaymentControllers from "../controllers/payment.controllers.js";

const router = Router();

router.route("/create-payment-intent").post(PaymentControllers.createPayment);

export default router;
