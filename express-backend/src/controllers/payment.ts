import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createPayment = async (req: Request, res: Response): Promise<any> => {
	try {
		const {amount, status, referenceId, method} = req.body;
		const payment = await prisma.payment.create({
			data: {amount, status, referenceId, method}
		});
		return res.status(200).json(payment);
	} catch (err) {
		return res.status(500).json({ message: "Error creating payment", error: err });
	}
};

export const getAllPayments = async (_req: Request, res: Response): Promise<any> => {
	try {
		const payments = await prisma.payment.findMany();
		return res.status(200).json(payments);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching payments", error: err });
	}
};

export const getPaymentById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const payment = await prisma.payment.findUnique({
			where: { id: parseInt(id) }
		});

		if (!payment) {
			return res.status(404).json({ message: "Payment not found" });
		}

		return res.status(200).json(payment);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching payment", error: err });
	}
};

export const updatePayment = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const {amount, status, referenceId, method} = req.body;
		
		const payment = await prisma.payment.update({
			where: { id: parseInt(id) },
			data: {amount, status, referenceId, method}
		});

		return res.status(200).json(payment);
	} catch (err) {
		return res.status(500).json({ message: "Error updating payment", error: err });
	}
};

export const deletePayment = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.payment.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Payment deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting payment", error: err });
	}
};
