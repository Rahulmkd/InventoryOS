import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * Allowed JWT durations (strict & type-safe)
 */
const jwtExpiresEnum = z.enum(["15m", "30m", "1h", "6h", "12h", "1d", "7d"]);

/**
 * ENV VALIDATION SCHEMA
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("5000")
    .transform((val) => Number(val)),

  DATABASE_URL: z.string().url(),

  // Access Token
  JWT_SECRET: z.string().min(10, "JWT_SECRET must be at least 10 characters"),
  JWT_EXPIRES_IN: jwtExpiresEnum.default("15m"),

  // Refresh Token
  JWT_REFRESH_SECRET: z
    .string()
    .min(10, "JWT_REFRESH_SECRET must be at least 10 characters"),
  JWT_REFRESH_EXPIRES_IN: jwtExpiresEnum.default("7d"),
});

/**
 * VALIDATE ENV
 */
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(" Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

/**
 * EXPORT CLEAN ENV
 */
export const env = parsed.data;
