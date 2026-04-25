import prisma from "../../prisma/client";
import { AppError } from "../../utils/app.error";

// Create Category
export const createCategory = async (data: { name: string }) => {
  const existing = await prisma.category.findUnique({
    where: { name: data.name },
  });

  if (existing) {
    throw new AppError("Category already exists", 409);
  }

  return prisma.category.create({
    data,
  });
};
// Get All Categories
export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// Get Single Category
export const getCategoryBid = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

// Update Category
export const updateCategory = async (id: string, data: { name?: string }) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

// Delete Category
export const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};
