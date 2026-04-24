import express from "express";
import cors from "cors";

import routes from "./routes/index"; //
import { notFoundHandler } from "./middleware/notFound.middleware";
import { globalErrorHandler } from "./middleware/globalError.middleware";

const app = express();

/**
 * -------------------------
 * SECURITY + MIDDLEWARES
 * -------------------------
 */
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
 * API ROUTES
 * -------------------------
 */
app.use("/api/v1", routes);

/**
 * -------------------------
 * 404 HANDLER (ONLY ONE!)
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
