import { Router } from "express";
import * as inventoryController from "./inventory.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Protected routes
router.route("/in").post(authenticate, inventoryController.stockIn);
router.route("/out").post(authenticate, inventoryController.stockOut);
router.route("/history").get(authenticate, inventoryController.getTransactions);

export default router;
