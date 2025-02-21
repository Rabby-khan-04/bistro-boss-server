import { Router } from "express";
import UserControllers from "../controllers/user.controllers.js";
import UserMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();

router.route("/user").post(UserControllers.createAUser);
router
  .route("/user")
  .get(UserMiddlewares.verifyJWT, UserControllers.getAllUsers);
router.route("/user/:id").delete(UserControllers.deleteUser);
router.route("/admin/:id").patch(UserControllers.makeAdmin);
router.route("/jwt").post(UserControllers.issueJWT);
router.route("/logout").post(UserControllers.logoutUser);

export default router;
