import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createVariant = async (req: Request, res: Response): Promise<any> => {
	try {
		const { name, productId, price, stock, optionIds } = req.body;
		const variant = await prisma.productVariant.create({
			data: {
				name,
				productId,
				price,
				stock,
				productOptions: {
					connect: optionIds.map((id: number) => ({ id }))
				}
			},
			include: {
				productOptions: true
			}
		});
		return res.status(200).json(variant);
	} catch (err) {
		return res.status(500).json({ message: "Error creating product variant", error: err });
	}
};

export const getAllVariants = async (req: Request, res: Response): Promise<any> => {
	try {
		const variants = await prisma.productVariant.findMany({
			include: {
				productOptions: true
			}
		});
		return res.status(200).json(variants);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching product variants", error: err });
	}
};

export const getVariantById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const variant = await prisma.productVariant.findUnique({
			where: { id: parseInt(id) },
			include: {
				productOptions: true
			}
		});
		if (!variant) {
			return res.status(404).json({ message: "Product variant not found" });
		}
		return res.status(200).json(variant);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching product variant", error: err });
	}
};

export const getVariantsByProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		const { productId } = req.params;
		const variants = await prisma.productVariant.findMany({
			where: { productId: parseInt(productId) },
			include: {
				productOptions: true
			}
		});
		return res.status(200).json(variants);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching variants by product", error: err });
	}
};

export const updateVariant = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const { name, productId, price, stock, optionIds } = req.body;
		const variant = await prisma.productVariant.update({
			where: { id: parseInt(id) },
			data: {
				name,
				productId,
				price,
				stock,
				productOptions: {
					set: optionIds.map((id: number) => ({ id }))
				}
			},
			include: {
				productOptions: true
			}
		});
		return res.status(200).json(variant);
	} catch (err) {
		return res.status(500).json({ message: "Error updating product variant", error: err });
	}
};

export const deleteVariant = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.productVariant.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Product Variant deleted" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting product variant", error: err });
	}
};
