import { z } from "zod";

export const stockSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().positive(),
  note: z.string().optional(),
});
