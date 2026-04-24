import { z } from "zod";

/**
 * Common reusable fields
 */
const email = z.email("Invalid email format").toLowerCase().trim();

const password = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(100, "Password too long");

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name too long")
      .trim(),

    email,

    password,

    confirmPassword: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z
  .object({
    email,
    password: z.string().min(1, "Password is required"),
  })
  .strict();

/**
 * Type inference (VERY IMPORTANT for production)
 */
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
