import { Router } from "express";
import UserControllers from "../controllers/user.controllers.js";
import UserMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();

router.route("/user").post(UserControllers.createAUser);
router
  .route("/user")
  .get(
    UserMiddlewares.verifyJWT,
    UserMiddlewares.verifyAdmin,
    UserControllers.getAllUsers
  );
router
  .route("/user/:id")
  .delete(
    UserMiddlewares.verifyJWT,
    UserMiddlewares.verifyAdmin,
    UserControllers.deleteUser
  );
router
  .route("/admin/:id")
  .patch(
    UserMiddlewares.verifyJWT,
    UserMiddlewares.verifyAdmin,
    UserControllers.makeAdmin
  );
router.route("/jwt").post(UserControllers.issueJWT);
router.route("/logout").post(UserControllers.logoutUser);
router
  .route("/admin/:email")
  .get(UserMiddlewares.verifyJWT, UserControllers.isAdmin);

export default router;
