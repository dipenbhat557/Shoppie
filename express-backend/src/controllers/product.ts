import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		const { name, description, categoryId, brandId, storeId, price, stock } = req.body;
		const product = await prisma.product.create({
			data: {
				name,
				description,
				categoryId,
				brandId,
				storeId,
				price,
				stock
			}
		});
		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).json({ message: "Error creating product", error: err });
	}
};

export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
	try {
		const products = await prisma.product.findMany();
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products", error: err });
	}
};

export const getProductById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const product = await prisma.product.findUnique({
			where: { id: parseInt(id) }
		});
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching product", error: err });
	}
};

export const getProductsByCategory = async (req: Request, res: Response): Promise<any> => {
	try {
		const { categoryId } = req.params;
		const products = await prisma.product.findMany({
			where: { categoryId: parseInt(categoryId) }
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by category", error: err });
	}
};

export const getProductsByBrand = async (req: Request, res: Response): Promise<any> => {
	try {
		const { brandId } = req.params;
		const products = await prisma.product.findMany({
			where: { brandId: parseInt(brandId) }
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by brand", error: err });
	}
};

export const getProductsByStore = async (req: Request, res: Response): Promise<any> => {
	try {
		const { storeId } = req.params;
		const products = await prisma.product.findMany({
			where: { storeId: parseInt(storeId) }
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by store", error: err });
	}
};

export const getProductsBySale = async (req: Request, res: Response): Promise<any> => {
	try {
		const { saleId } = req.params;
		const products = await prisma.product.findMany({
			where: {
				saleId: parseInt(saleId)
			}
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by sale", error: err });
	}
};

export const getProductsByWishlist = async (req: Request, res: Response): Promise<any> => {
	try {
		const { wishlistId } = req.params;
		const products = await prisma.wishlistItem.findMany({
			where: {
				wishlistId: parseInt(wishlistId)
			}
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by wishlist", error: err });
	}
};

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const { name, description, categoryId, variants } = req.body;
		const product = await prisma.product.update({
			where: { id: parseInt(id) },
			data: {
				name,
				description,
				categoryId,
				variants: {
					upsert: variants.map((variant: any) => ({
						where: { id: variant.id || 0 },
						create: variant,
						update: variant
					}))
				}
			},
			include: {
				variants: true
			}
		});
		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).json({ message: "Error updating product", error: err });
	}
};

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.product.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Product deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting product", error: err });
	}
};
