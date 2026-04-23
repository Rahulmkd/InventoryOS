import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import { notFoundHandler } from "./middleware/notFound.middleware";
import { globalErrorHandler } from "./middleware/globalError.middleware";

const app = express();

/**
 * -------------------------
 * SECURITY + MIDDLEWARES
 * -------------------------
 */

// Allow only trusted origins in production
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------------------
 * HEALTH CHECK
 * -------------------------
 */
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running ",
    timestamp: new Date().toISOString(),
  });
});

/**
 * -------------------------
 * ROUTES
 * -------------------------
 */

import authRouter from "./modules/auth/auth.routes";
import inventoryRoutes from "./modules/inventory/inventory.routes";
import categoryRoutes from "./modules/category/category.routes";
import supplierRoutes from "./modules/supplier/supplier.routes";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/suppliers", supplierRoutes);

/**
 * -------------------------
 * 404 HANDLER
 * -------------------------
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * -------------------------
 * 404 Handler
 * -------------------------
 */
app.use(notFoundHandler);

/**
 * -------------------------
 * GLOBAL ERROR HANDLER
 * -------------------------
 */
app.use(globalErrorHandler);

export default app;
