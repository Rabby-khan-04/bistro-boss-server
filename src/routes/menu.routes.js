import { Router } from "express";
import MenuControllers from "../controllers/menu.controllers.js";

const router = Router();

router.route("/menu/:category").get(MenuControllers.getAllMenu);
router.route("/count/:category").get(MenuControllers.getMenuCount);

export default router;
