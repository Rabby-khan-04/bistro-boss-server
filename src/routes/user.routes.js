import { Router } from "express";
import UserControllers from "../controllers/user.controllers.js";

const router = Router();

router.route("/user").post(UserControllers.createAUser);
router.route("/user").get(UserControllers.getAllUsers);
router.route("/user/:id").delete(UserControllers.deleteUser);

export default router;
