import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		const { name, description, categoryId, brandId } = req.body;
		
		// Validate required fields
		if (!name || !description || !categoryId || !brandId) {
			return res.status(400).json({
				message: "Missing required fields: name, description, categoryId, and brandId are required"
			});
		}

		const product = await prisma.product.create({
			data: {
				name,
				description,
				categoryId,
				brandId
			},
			include: {
				category: true,
				brand: true,
				variants: true
			}
		});
		return res.status(201).json(product);
	} catch (err) {
		console.error('Create product error:', err);
		return res.status(500).json({ message: "Error creating product", error: err });
	}
};

export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
	try {
		const products = await prisma.product.findMany({
			include: {
				category: true,
				brand: true,
				variants: true,
				reviews: true
			}
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products", error: err });
	}
};

export const getProductById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;

		if (!id || isNaN(parseInt(id))) {
			return res.status(400).json({ message: "Invalid product ID" });
		}

		const product = await prisma.product.findUnique({
			where: { id: parseInt(id) },
			include: {
				category: true,
				brand: true,
				variants: true,
				reviews: true
			}
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

		if (!categoryId || isNaN(parseInt(categoryId))) {
			return res.status(400).json({ message: "Invalid category ID" });
		}

		const products = await prisma.product.findMany({
			where: { categoryId: parseInt(categoryId) },
			include: {
				category: true,
				brand: true,
				variants: true
			}
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by category", error: err });
	}
};

export const getProductsByBrand = async (req: Request, res: Response): Promise<any> => {
	try {
		const { brandId } = req.params;

		if (!brandId || isNaN(parseInt(brandId))) {
			return res.status(400).json({ message: "Invalid brand ID" });
		}

		const products = await prisma.product.findMany({
			where: { brandId: parseInt(brandId) },
			include: {
				category: true,
				brand: true,
				variants: true
			}
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by brand", error: err });
	}
};

export const getProductsByStore = async (req: Request, res: Response): Promise<any> => {
	try {
		const { storeId } = req.params;

		if (!storeId || isNaN(parseInt(storeId))) {
			return res.status(400).json({ message: "Invalid store ID" });
		}

		const products = await prisma.product.findMany({
			where: {
				variants: {
					some: {
						storeId: parseInt(storeId)
					}
				}
			},
			include: {
				category: true,
				brand: true,
				variants: {
					include: {
						store: true
					}
				}
			}
		});
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by store", error: err });
	}
};

export const getProductsBySale = async (req: Request, res: Response): Promise<any> => {
	try {
		const { saleId } = req.params;

		if (!saleId || isNaN(parseInt(saleId))) {
			return res.status(400).json({ message: "Invalid sale ID" });
		}

		const products = await prisma.product.findMany({
			where: { saleId: parseInt(saleId) },
			include: {
				sale: true,
				variants: true
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

		if (!wishlistId || isNaN(parseInt(wishlistId))) {
			return res.status(400).json({ message: "Invalid wishlist ID" });
		}

		const wishlist = await prisma.wishlist.findUnique({
			where: { id: parseInt(wishlistId) },
			include: {
				products: {
					include: {
						category: true,
						brand: true,
						variants: true
					}
				}
			}
		});

		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found" });
		}

		return res.status(200).json(wishlist.products);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching products by wishlist", error: err });
	}
};

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const { name, description, categoryId, brandId } = req.body;

		if (!id || isNaN(parseInt(id))) {
			return res.status(400).json({ message: "Invalid product ID" });
		}

		const product = await prisma.product.update({
			where: { id: parseInt(id) },
			data: {
				...(name && { name }),
				...(description && { description }),
				...(categoryId && { categoryId }),
				...(brandId && { brandId })
			},
			include: {
				category: true,
				brand: true,
				variants: true
			}
		});

		return res.status(200).json(product);
	} catch (err) {
		console.error('Update product error:', err);
		return res.status(500).json({ message: "Error updating product", error: err });
	}
};

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;

		if (!id || isNaN(parseInt(id))) {
			return res.status(400).json({ message: "Invalid product ID" });
		}

		// Check if product exists and get its details
		const product = await prisma.product.findUnique({
			where: { id: parseInt(id) },
			include: {
				variants: true,
				reviews: true
			}
		});

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Check for related variants
		if (product.variants.length > 0) {
			return res.status(400).json({
				message: "Cannot delete product with associated variants",
				variantCount: product.variants.length
			});
		}

		// Delete associated reviews first
		if (product.reviews.length > 0) {
			await prisma.review.deleteMany({
				where: { productId: parseInt(id) }
			});
		}

		await prisma.product.delete({
			where: { id: parseInt(id) }
		});

		return res.status(200).json({
			message: "Product deleted successfully",
			deletedProduct: {
				id: product.id,
				name: product.name
			}
		});
	} catch (err) {
		console.error('Delete product error:', err);
		return res.status(500).json({ message: "Error deleting product", error: err });
	}
};
