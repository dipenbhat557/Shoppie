import { Request, Response } from "express";
import prisma from "../config/prisma";
import { OrderStatus } from "../types";

export const createOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const { 
            userId, 
            vendor, 
            items,
            price,
            paymentId 
        } = req.body;

        // Validate required fields
        if (!userId || !vendor || !items || !price || items.length === 0) {
            return res.status(400).json({ 
                message: "Missing required fields: userId, vendor, items, and price are required" 
            });
        }

        // Create order with all required fields
        const order = await prisma.order.create({
            data: {
                userId,
                vendor,
                price,
                status: OrderStatus.PLACED,
                orderDate: new Date(),
                paymentId,
                items: {
                    create: items.map((item: any) => ({
                        price: item.price,
                        quantity: item.quantity,
                        productVariantId: item.productVariantId
                    }))
                }
            },
            include: {
                items: true,
                payment: true
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
        const orders = await prisma.order.findMany({
            include: {
                items: true,
                payment: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        });
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching orders", error: err });
    }
};

export const getOrderById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { orderId } = req.params;
        
        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                            }
                        }
                    }
                },
                payment: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
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

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const orders = await prisma.order.findMany({
            where: { userId },
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
                payment: true
            },
            orderBy: {
                orderDate: 'desc'
            }
        });
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching user orders", error: err });
    }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { orderId } = req.params;
        const { status, deliveryDate } = req.body;

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        if (!Object.values(OrderStatus).includes(status)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { 
                status,
                ...(deliveryDate && { deliveryDate: new Date(deliveryDate) })
            },
            include: {
                items: true,
                payment: true
            }
        });

        return res.status(200).json(order);
    } catch (err) {
        return res.status(500).json({ message: "Error updating order status", error: err });
    }
};

