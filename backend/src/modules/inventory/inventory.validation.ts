import { z } from "zod";

export const stockInSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().int().positive(), // grams
  note: z.string().optional(),
});

export const stockOutSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().int().positive(),
  note: z.string().optional(),
});
