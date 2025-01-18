import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOrderItem = async (req: Request, res: Response): Promise<any> => {
	try {
		const { productVariantId, quantity, orderId } = req.body;
		const orderItem = await prisma.orderItem.create({
			data: {
				productVariantId,
				quantity,
				orderId
			}
		});
		return res.status(201).json(orderItem);
	} catch (err) {
		console.error('Create order item error:', err);
		return res.status(500).json({ message: "Error creating order item", error: err });
	}
};

export const getAllOrderItems = async (_req: Request, res: Response): Promise<any> => {
	try {
		const orderItems = await prisma.orderItem.findMany();
		return res.status(200).json(orderItems);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching order items", error: err });
	}
};

export const getOrderItemById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const orderItem = await prisma.orderItem.findUnique({
			where: { id: parseInt(id) }
		});

		if (!orderItem) {
			return res.status(404).json({ message: "Order item not found" });
		}

		return res.status(200).json(orderItem);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching order item", error: err });
	}
};

export const updateOrderItem = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const { productVariantId, quantity, orderId } = req.body;

		const orderItem = await prisma.orderItem.update({
			where: { id: parseInt(id) },
			data: {
				productVariantId,
				quantity,
				orderId
			}
		});

		return res.status(200).json(orderItem);
	} catch (err) {
		console.error('Update order item error:', err);
		return res.status(500).json({ message: "Error updating order item", error: err });
	}
};

export const deleteOrderItem = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.orderItem.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting order item", error: err });
	}
};
