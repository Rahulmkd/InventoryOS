import { Router } from "express";

import authRouter from "../modules/auth/auth.routes";
import categoryRoutes from "../modules/category/category.routes";
import supplierRoutes from "../modules/supplier/supplier.routes";
import productRoutes from "../modules/product/product.routes";
import inventoryRoutes from "../modules/inventory/inventory.routes";

const router = Router();

/**
 * -------------------------
 * HEALTH CHECK
 * -------------------------
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running ",
    timestamp: new Date().toISOString(),
  });
});

/**
 * -------------------------
 * MODULE ROUTES
 * -------------------------
 */
router.use("/auth", authRouter);
router.use("/categories", categoryRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/products", productRoutes);
router.use("/inventory", inventoryRoutes);

export default router;
