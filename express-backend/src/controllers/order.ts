import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOrder = async (req: Request, res: Response): Promise<any> => {
	try {
		const { userId, vendor, items } = req.body;
		const order = await prisma.order.create({
			data: {
				userId,
				vendor,
				items: {
					create: items
				}
			}
		});
		return res.status(201).json(order);
	} catch (err) {
		console.error('Create order error:', err);
		return res.status(500).json({ message: "Error creating order", error: err });
	}
};

export const getAllOrders = async (_req: Request, res: Response): Promise<any> => {
	try {
		const orders = await prisma.order.findMany();
		return res.status(200).json(orders);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching orders", error: err });
	}
};

export const getOrderById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { orderId } = req.params;
		const order = await prisma.order.findUnique({
			where: { id: parseInt(orderId) }
		});

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		return res.status(200).json(order);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching order", error: err });
	}
};

export const getOrdersByUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const { userId } = req.params;
		const orders = await prisma.order.findMany({
			where: { userId: parseInt(userId) }
		});
		return res.status(200).json(orders);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching user orders", error: err });
	}
};

export const addOrderItem = async (req: Request, res: Response): Promise<any> => {
	try {
		const { orderId, productVariantId, quantity } = req.body;
		const orderItem = await prisma.orderItem.create({
			data: { orderId, productVariantId, quantity }
		});
		return res.status(201).json(orderItem);
	} catch (err) {
		return res.status(500).json({ message: "Error adding order item", error: err });
	}
};