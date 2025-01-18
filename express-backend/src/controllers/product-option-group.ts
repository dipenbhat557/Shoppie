import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOptionGroup = async (req: Request, res: Response): Promise<any> => {
	try {
		const { optionGroupName } = req.query;
		const optionGroup = await prisma.productOptionGroup.create({
			data: { name: optionGroupName as string }
		});
		return res.status(200).json(optionGroup);
	} catch (err) {
		return res.status(500).json({ message: "Error creating option group", error: err });
	}
};

export const getAllOptionGroups = async (_req: Request, res: Response): Promise<any> => {
	try {
		const optionGroups = await prisma.productOptionGroup.findMany();
		return res.status(200).json(optionGroups);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching option groups", error: err });
	}
};

export const getOptionGroupById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const optionGroup = await prisma.productOptionGroup.findUnique({
			where: { id: parseInt(id) }
		});

		if (!optionGroup) {
			return res.status(404).json({ message: "Option group not found" });
		}

		return res.status(200).json(optionGroup);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching option group", error: err });
	}
};

export const getByCategory = async (req: Request, res: Response): Promise<any> => {
	try {
		const { categoryId } = req.params;
		const optionGroups = await prisma.productOptionGroup.findMany({
			where: { categoryId: parseInt(categoryId) }
		});
		return res.status(200).json(optionGroups);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching option groups by category", error: err });
	}
};

export const updateOptionGroup = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const { optionGroupName } = req.query;
		
		const optionGroup = await prisma.productOptionGroup.update({
			where: { id: parseInt(id) },
			data: { name: optionGroupName as string }
		});

		return res.status(200).json(optionGroup);
	} catch (err) {
		return res.status(500).json({ message: "Error updating option group", error: err });
	}
};

export const deleteOptionGroup = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.productOptionGroup.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Option group deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting option group", error: err });
	}
};

export const addOptionGroupToCategory = async (req: Request, res: Response): Promise<any> => {
	try {
		const { optionGroupId, categoryId } = req.params;
		const optionGroup = await prisma.productOptionGroup.update({
			where: { id: parseInt(optionGroupId) },
			data: { categories: { connect: { id: parseInt(categoryId) } } }
		});
		return res.status(200).json(optionGroup);
	} catch (err) {
		return res.status(500).json({ message: "Error adding option group to category", error: err });
	}
};
