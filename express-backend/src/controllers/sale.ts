import { Request, Response } from "express";
import prisma from "../config/prisma";
import { uploadToS3 } from "../utils/s3";

export const createSale = async (req: Request, res: Response): Promise<any> => {
	try {
		const { description, startDate, endDate, discount, isPercentage, productIds } = JSON.parse(req.body.input);
		const file = req.file;

		// Validate required fields
		if (!description || !startDate || !endDate || discount === undefined || isPercentage === undefined) {
			return res.status(400).json({
				message: "Missing required fields: description, startDate, endDate, discount, and isPercentage are required"
			});
		}

		// Validate dates
		const start = new Date(startDate);
		const end = new Date(endDate);
		if (end <= start) {
			return res.status(400).json({
				message: "End date must be after start date"
			});
		}

		if (!file) {
			return res.status(400).json({ message: "Sale image is required" });
		}

		const fileUrl = await uploadToS3(file);

		const sale = await prisma.sale.create({
			data: {
				description,
				startDate: start,
				endDate: end,
				discount,
				isPercentage,
				imageUrl: fileUrl,
				...(productIds && {
					products: {
						connect: productIds.map((id: number) => ({ id }))
					}
				})
			},
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

		return res.status(201).json(sale);
	} catch (err) {
		console.error('Create sale error:', err);
		return res.status(500).json({ message: "Error creating sale", error: err });
	}
};

export const getSaleById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;

		if (!id || isNaN(parseInt(id))) {
			return res.status(400).json({ message: "Invalid sale ID" });
		}

		const sale = await prisma.sale.findUnique({
			where: { id: parseInt(id) },
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

		if (!sale) {
			return res.status(404).json({ message: "Sale not found" });
		}

		return res.status(200).json(sale);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching sale", error: err });
	}
};

export const getAllSales = async (_req: Request, res: Response): Promise<any> => {
	try {
		const sales = await prisma.sale.findMany({
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
		return res.status(200).json(sales);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching sales", error: err });
	}
};

export const getActiveSales = async (_req: Request, res: Response): Promise<any> => {
	try {
		const currentDate = new Date();
		const sales = await prisma.sale.findMany({
			where: {
				startDate: {
					lte: currentDate
				},
				endDate: {
					gte: currentDate
				}
			},
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
		return res.status(200).json(sales);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching active sales", error: err });
	}
};

export const updateSale = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const { description, startDate, endDate, discount, isPercentage, productIds } = JSON.parse(req.body.input);
		const file = req.file;

		if (!id || isNaN(parseInt(id))) {
			return res.status(400).json({ message: "Invalid sale ID" });
		}

		// Validate dates if provided
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);
			if (end <= start) {
				return res.status(400).json({
					message: "End date must be after start date"
				});
			}
		}

		let fileUrl;
		if (file) {
			fileUrl = await uploadToS3(file);
		}

		const sale = await prisma.sale.update({
			where: { id: parseInt(id) },
			data: {
				...(description && { description }),
				...(startDate && { startDate: new Date(startDate) }),
				...(endDate && { endDate: new Date(endDate) }),
				...(discount !== undefined && { discount }),
				...(isPercentage !== undefined && { isPercentage }),
				...(fileUrl && { imageUrl: fileUrl }),
				...(productIds && {
					products: {
						set: productIds.map((id: number) => ({ id }))
					}
				})
			},
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

		return res.status(200).json(sale);
	} catch (err) {
		console.error('Update sale error:', err);
		return res.status(500).json({ message: "Error updating sale", error: err });
	}
};

export const deleteSale = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;

		if (!id || isNaN(parseInt(id))) {
			return res.status(400).json({ message: "Invalid sale ID" });
		}

		// Check if sale exists
		const sale = await prisma.sale.findUnique({
			where: { id: parseInt(id) },
			include: {
				products: true
			}
		});

		if (!sale) {
			return res.status(404).json({ message: "Sale not found" });
		}

		// Delete the sale
		await prisma.sale.delete({
			where: { id: parseInt(id) }
		});

		return res.status(200).json({
			message: "Sale deleted successfully",
			deletedSale: {
				id: sale.id,
				description: sale.description,
				productCount: sale.products.length
			}
		});
	} catch (err) {
		console.error('Delete sale error:', err);
		return res.status(500).json({ message: "Error deleting sale", error: err });
	}
};
