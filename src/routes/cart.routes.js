import { Router } from "express";
import CartControllers from "../controllers/cart.controllers.js";

const router = Router();

router.route("/add-to-cart").post(CartControllers.addToCart);
router.route("/cart").get(CartControllers.getCart);

export default router;
