import { Router } from "express";
import * as inventoryController from "./inventory.controller";

const router = Router();

// Protected routes
router.route("/in").post(inventoryController.stockIn);
router.route("/out").post(inventoryController.stockOut);
router.route("/history").get(inventoryController.getTransactions);

export default router;
