import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(2, "Supplier name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const updateSupplierSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const supplierParamsSchema = z.object({
  id: z.string().min(1, "Supplier ID is required"),
});
