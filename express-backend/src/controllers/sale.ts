import { Request, Response } from "express";
import prisma from "../config/prisma";
import { uploadToS3 } from "../utils/s3";

export const createSale = async (req: Request, res: Response): Promise<any> => {
	try {
		const {description, startDate, endDate, discount, isPercentage, productIds} = JSON.parse(req.body.input);
		const file = req.file;

		if (!file) {
			return res.status(400).json({ message: "File is required" });
		}

		const fileUrl = await uploadToS3(file);

		const sale = await prisma.sale.create({
			data: {
				description,
				startDate,
				endDate,
				discount,
				isPercentage,
				productIds,
				imageUrl: fileUrl
			}
		});

		return res.status(200).json(sale);
	} catch (err) {
		return res.status(400).json({ message: "Error creating sale", error: err });
	}
};

export const getSaleById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const sale = await prisma.sale.findUnique({
			where: { id: parseInt(id) }
		});

		if (!sale) {
			return res.status(404).json({ message: "Sale not found" });
		}

		return res.status(200).json(sale);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching sale", error: err });
	}
};

export const getAllSales = async (req: Request, res: Response): Promise<any> => {
	try {
		const sales = await prisma.sale.findMany();
		return res.status(200).json(sales);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching sales", error: err });
	}
};

export const getActiveSales = async (req: Request, res: Response): Promise<any> => {
	try {
		const sales = await prisma.sale.findMany({
			where: {
				startDate: {
					lte: new Date()
				},
				endDate: {
					gte: new Date()
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
		const {description, startDate, endDate, discount, isPercentage, productIds} = JSON.parse(req.body.input);
		const file = req.file;

		let fileUrl;
		if (file) {
			fileUrl = await uploadToS3(file);
		}

		const sale = await prisma.sale.update({
			where: { id: parseInt(id) },
			data: {
				description,
				startDate,
				endDate,
				discount,
				isPercentage,
				productIds,
				...(fileUrl && { imageUrl: fileUrl })
			}
		});

		return res.status(200).json(sale);
	} catch (err) {
		return res.status(400).json({ message: "Error updating sale", error: err });
	}
};

export const deleteSale = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.sale.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Sale deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting sale", error: err });
	}
};
