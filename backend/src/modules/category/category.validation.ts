import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).optional(),
});

export const categoryParamsSchema = z.object({
  id: z.string().min(1, "Category ID is required"),
});
