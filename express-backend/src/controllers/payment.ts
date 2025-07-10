import { Request, Response } from "express";
import prisma from "../config/prisma";
import { PaymentStatus } from "../types";

export const createPayment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { amount, status, referenceId, method } = req.body;

        // Validate required fields
        if (!amount || !status || !referenceId || !method) {
            return res.status(400).json({
                message: "Missing required fields: amount, status, referenceId, and method are required"
            });
        }

        // Validate amount
        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount must be a positive number"
            });
        }

        // Validate payment status
        if (!Object.values(PaymentStatus).includes(status)) {
            return res.status(400).json({
                message: "Invalid payment status. Must be one of: " + Object.values(PaymentStatus).join(", ")
            });
        }

        const payment = await prisma.payment.create({
            data: {
                amount,
                status,
                referenceId,
                method,
                paymentDate: new Date()
            },
            include: {
                orders: {
                    include: {
                        items: {
                            include: {
                                productVariant: {
                                    include: {
                                        product: true
                                    }
                                }
                            }
                        },
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        return res.status(201).json(payment);
    } catch (err) {
        console.error('Create payment error:', err);
        return res.status(500).json({ message: "Error creating payment", error: err });
    }
};

export const getAllPayments = async (_req: Request, res: Response): Promise<any> => {
    try {
        const payments = await prisma.payment.findMany({
            include: {
                orders: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                paymentDate: 'desc'
            }
        });
        return res.status(200).json(payments);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching payments", error: err });
    }
};

export const getPaymentById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }

        const payment = await prisma.payment.findUnique({
            where: { id: parseInt(id) },
            include: {
                orders: {
                    include: {
                        items: {
                            include: {
                                productVariant: {
                                    include: {
                                        product: true
                                    }
                                }
                            }
                        },
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        }
                    }
                }
            }
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
        const { status } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }

        // Only allow status updates
        if (!status) {
            return res.status(400).json({
                message: "Payment status is required for updates"
            });
        }

        // Validate payment status
        if (!Object.values(PaymentStatus).includes(status)) {
            return res.status(400).json({
                message: "Invalid payment status. Must be one of: " + Object.values(PaymentStatus).join(", ")
            });
        }

        const payment = await prisma.payment.update({
            where: { id: parseInt(id) },
            data: { status },
            include: {
                orders: {
                    include: {
                        items: true,
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        return res.status(200).json(payment);
    } catch (err) {
        console.error('Update payment error:', err);
        return res.status(500).json({ message: "Error updating payment", error: err });
    }
};

export const deletePayment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }

        // Check if payment exists and has associated orders
        const payment = await prisma.payment.findUnique({
            where: { id: parseInt(id) },
            include: {
                orders: true
            }
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Don't allow deletion if payment has associated orders
        if (payment.orders.length > 0) {
            return res.status(400).json({
                message: "Cannot delete payment with associated orders",
                orderCount: payment.orders.length
            });
        }

        await prisma.payment.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({
            message: "Payment deleted successfully",
            deletedPayment: {
                id: payment.id,
                amount: payment.amount,
                status: payment.status,
                paymentDate: payment.paymentDate
            }
        });
    } catch (err) {
        console.error('Delete payment error:', err);
        return res.status(500).json({ message: "Error deleting payment", error: err });
    }
};
