import { Router } from "express";
import MenuControllers from "../controllers/menu.controllers.js";
import UserMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();

router.route("/menu/:category").get(MenuControllers.getAllMenu);
router.route("/count/:category").get(MenuControllers.getMenuCount);
router
  .route("/menu")
  .post(
    UserMiddlewares.verifyJWT,
    UserMiddlewares.verifyAdmin,
    MenuControllers.addAMenuItem
  );

router
  .route("/menu/:id")
  .delete(
    UserMiddlewares.verifyJWT,
    UserMiddlewares.verifyAdmin,
    MenuControllers.deleteMenuItem
  );

export default router;
