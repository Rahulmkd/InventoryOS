import prisma from "../../prisma/client";
import { AppError } from "../../utils/app.error";
/**
 * CREATE PRODUCT
 */
export const createProduct = async (data: any) => {
  const { categoryId, supplierId } = data;

  // Validate category
  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new AppError("Invalid categoryId", 400);
    }
  }

  // Validate supplier
  if (supplierId) {
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new AppError("Invalid supplierId", 400);
    }
  }

  return prisma.product.create({
    data,
  });
};

/**
 * GET ALL PRODUCTS
 */
export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: {
      category: true,
      supplier: true,
    },

    orderBy: { createdAt: "desc" },
  });
};

/**
 * GET PRODUCT BY ID
 */
export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      supplier: true,
    },
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (id: string, data: any) => {
  const existing = await prisma.product.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError("Product not found", 404);
  }

  // Validate category
  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new AppError("Invalid categoryId", 400);
    }
  }

  // Validate supplier
  if (data.supplierId) {
    const supplier = await prisma.supplier.findUnique({
      where: { id: data.supplierId },
    });

    if (!supplier) {
      throw new AppError("Invalid supplierId", 400);
    }
  }

  return prisma.product.update({
    where: { id },
    data,
  });
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return prisma.product.delete({
    where: { id },
  });
};

/**
 * LOW STOCK PRODUCTS
 */
export const getLowStockProducts = async () => {
  const products = await prisma.product.findMany();

  return products.filter((p) => p.quantity <= p.lowStockThreshold);
};
