import { Router } from "express";
import MenuControllers from "../controllers/menu.controllers.js";
import UserMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();

router.route("/menu/:category").get(MenuControllers.getAllMenu);
router.route("/count/:category").get(MenuControllers.getMenuCount);
router
  .route("/menu/:id")
  .delete(
    UserMiddlewares.verifyJWT,
    UserMiddlewares.verifyAdmin,
    MenuControllers.deleteMenuItem
  );

router.route("/menu-item/:id").get(MenuControllers.getAMenuData);
router.route("/menu-item/:id").patch(MenuControllers.updateMenuItem);
router
  .route("/menu")
  .post(
    UserMiddlewares.verifyJWT,
    UserMiddlewares.verifyAdmin,
    MenuControllers.addAMenuItem
  );

export default router;
