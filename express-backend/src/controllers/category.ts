import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  deleteFile,
  getExactFileUrl,
  uploadToS3,
} from "../utils/s3";

export const createCategory = async (req: any, res: any): Promise<any> => {
  try {
    const { name, parentCategoryId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    let imageUrl;
    try {
      imageUrl = await uploadToS3(file);
    } catch (error) {
      console.error("File save error:", error);
      return res.status(500).json({ message: "Error saving image file" });
    }

    const category = await prisma.category.create({
      data: {
        name,
        parentCategoryId: parentCategoryId ? parentCategoryId : null,
        imageUrl,
      },
    });

    return res.status(201).json(category);
  } catch (err) {
    console.error("Create category error:", err);
    return res
      .status(500)
      .json({ message: "Error creating category", error: err });
  }
};

export const getAllCategories = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: true,
      },
    });

    const formattedCategories = categories.map((category: any) => ({
      ...category,
      imageUrl: category.imageUrl ? getExactFileUrl(category.imageUrl) : null,
    }));

    return res.status(200).json(formattedCategories);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching categories", error: err });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const formattedCategory = {
      ...category,
      imageUrl: category.imageUrl ? getExactFileUrl(category.imageUrl) : null,
    };

    return res.status(200).json(formattedCategory);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching category", error: err });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, parentCategoryId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const file = req.file;
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = await uploadToS3(file);
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        parentCategoryId: parentCategoryId ? parentCategoryId : null,
        ...(imageUrl && { imageUrl }),
      },
    });

    return res.status(200).json(category);
  } catch (err) {
    console.error("Update category error:", err);
    return res
      .status(500)
      .json({ message: "Error updating category", error: err });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: { id },
    });
    console.log(category);

    if (category.imageUrl) {
      await deleteFile(category.imageUrl);
    }

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting category", error: err });
  }
};
