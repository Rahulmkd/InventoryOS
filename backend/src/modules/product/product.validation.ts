import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),

  quantity: z.number().int().nonnegative().default(0), // grams

  unit: z.string().default("g"),
  lowStockThreshold: z.number().int().default(500),

  pricePerKg: z.number().positive().optional(),

  categoryId: z.string().uuid().optional(),
  supplierId: z.string().uuid().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  sku: z.string().min(2).optional(),
  quantity: z.number().int().nonnegative().optional(),
  unit: z.string().optional(),
  lowStockThreshold: z.number().int().optional(),
  pricePerKg: z.number().positive().optional(),
  categoryId: z.string().uuid().optional(),
  supplierId: z.string().uuid().optional(),
});

export const productParamsSchema = z.object({
  id: z.string().min(1, "Product Id is required"),
});
