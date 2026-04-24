import { Router } from "express";
import * as authController from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

/**
 * Public Routes
 */

router.route("/register").post(authController.refresh);
router.route("/login").post(authController.login);

/**
 * Protected Routes
 */

router.route("/logout").post(authController.logout);
router.route("/loglogout-allout").post(authenticate, authController.logoutAll);

export default router;
