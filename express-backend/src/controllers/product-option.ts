import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOption = async (req: Request, res: Response):Promise<any> => {
	try {
		const { name, productOptionGroupId } = req.body;
		const option = await prisma.productOption.create({
			data: {
				name,
				productOptionGroupId
			}
		});
		return res.status(200).json(option);
	} catch (err) {
		return res.status(500).json({ message: "Error creating product option", error: err });
	}
};

export const getAllOptions = async (req: Request, res: Response):Promise<any> => {
	try {
		const options = await prisma.productOption.findMany();
		return res.status(200).json(options);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching product options", error: err });
	}
};

export const getOptionById = async (req: Request, res: Response):Promise<any> => {
	try {
		const { id } = req.params;
		const option = await prisma.productOption.findUnique({
			where: { id: parseInt(id) }
		});
		if (!option) {
			return res.status(404).json({ message: "Product option not found" });
		}
		return res.status(200).json(option);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching product option", error: err });
	}
};

export const getOptionsByGroup = async (req: Request, res: Response):Promise<any> => {
	try {
		const { optionGroupId } = req.params;
		const options = await prisma.productOption.findMany({
			where: { productOptionGroupId: parseInt(optionGroupId) }
		});
		return res.status(200).json(options);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching options by group", error: err });
	}
};

export const updateOption = async (req: Request, res: Response):Promise<any> => {
	try {
		const { id } = req.params;
		const { name, productOptionGroupId } = req.body;
		const option = await prisma.productOption.update({
			where: { id: parseInt(id) },
			data: {
				name,
				productOptionGroupId
			}
		});
		return res.status(200).json(option);
	} catch (err) {
		return res.status(500).json({ message: "Error updating product option", error: err });
	}
};

export const deleteOption = async (req: Request, res: Response):Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.productOption.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Product Option deleted" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting product option", error: err });
	}
};
