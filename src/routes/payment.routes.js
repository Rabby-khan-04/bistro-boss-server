import { Router } from "express";
import PaymentControllers from "../controllers/payment.controllers.js";
import UserMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();

router.route("/create-payment-intent").post(PaymentControllers.createPayment);
router.route("/order").post(PaymentControllers.saveOrder);
router
  .route("/order/:email")
  .get(UserMiddlewares.verifyJWT, PaymentControllers.getOrderHistory);

export default router;
