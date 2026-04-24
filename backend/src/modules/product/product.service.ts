import prisma from "../../prisma/client";

// Create Product (with validation of relations)
export const createProduct = async (data: any) => {
  const { categoryId, supplierId } = data;

  // Validate Category
  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) throw new Error("Invalid categoryId");
  }

  // Validate Supplier
  if (supplierId) {
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) throw new Error("Invalid supplierId");
  }

  return prisma.product.create({
    data,
  });
};

// Get All Products (with relations)
export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: {
      category: true,
      supplier: true,
    },

    orderBy: { createdAt: "desc" },
  });
};

// Get Single Product
export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      supplier: true,
    },
  });
};

// Update Product
export const updateProduct = async (id: string, data: any) => {
  // Validate relations again
  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) throw new Error("Invalid categoryId");
  }
  if (data.supplierId) {
    const supplier = await prisma.supplier.findUnique({
      where: { id: data.supplierId },
    });

    if (!supplier) throw new Error("Invalid supplierId");
  }

  return prisma.product.update({
    where: { id },
    data,
  });
};

// Delete Product
export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};

// Low Stock Products (IMPORTANT)
export const getLowStockProducts = async () => {
  return prisma.product.findMany({
    where: {
      quantity: {
        lte: prisma.product.fields.lowStockThreshold,
      },
    },
  });
};