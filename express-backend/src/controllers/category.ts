import { Request, Response } from "express";
import prisma from "../config/prisma";
import { uploadToS3 } from "../utils/s3";

export const createCategory = async (req: Request, res: Response): Promise<any> => {
	try {
		const { name, parentCategoryId } = req.body;

		if (!name) {
			return res.status(400).json({ message: "Category name is required" });
		}

		const file = req.file;
		if (!file) {
			return res.status(400).json({ message: "Image file is required" });
		}

		const imageUrl = await uploadToS3(file);

		const category = await prisma.category.create({
			data: {
				name,
                parentCategoryId,
				imageUrl
			}
		});

		return res.status(201).json(category);
	} catch (err) {
		console.error('Create category error:', err);
		return res.status(500).json({ message: "Error creating category", error: err });
	}
};

export const getAllCategories = async (_req: Request, res: Response): Promise<any> => {
	try {
		const categories = await prisma.category.findMany();
		return res.status(200).json(categories);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching categories", error: err });
	}
};

export const getCategoryById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const category = await prisma.category.findUnique({
			where: { id: parseInt(id) }
		});

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		return res.status(200).json(category);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching category", error: err });
	}
};

export const updateCategory = async (req: Request, res: Response): Promise<any> => {
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
			where: { id: parseInt(id) },
			data: {
				name,
				parentCategoryId,
				...(imageUrl && { imageUrl })
			}
		});

		return res.status(200).json(category);
	} catch (err) {
		console.error('Update category error:', err);
		return res.status(500).json({ message: "Error updating category", error: err });
	}
};

export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.category.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting category", error: err });
	}
};

