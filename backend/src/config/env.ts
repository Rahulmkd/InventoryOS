import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("5000")
    .transform((val) => parseInt(val, 10)),

  DATABASE_URL: z.string().url(),

  JWT_SECRET: z.string().min(10, "JWT_SECRET must be at least 10 characters"),

  JWT_EXPIRES_IN: z.string().min(1).default("1d"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
