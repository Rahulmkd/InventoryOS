import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { stockIn } from "./inventory.controller";

const router = express.Router();

// Protected routes
router.route("/in").post(authMiddleware, stockIn);

export default router;
