import { Router } from "express";
import ReviewControllers from "../controllers/review.controllers.js";

const router = Router();

router.route("/review").get(ReviewControllers.getAllReview);

export default router;
