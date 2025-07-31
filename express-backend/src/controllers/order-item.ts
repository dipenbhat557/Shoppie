import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOrderItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productVariantId, quantity, orderId, price } = req.body;

        // Validate required fields
        if (!productVariantId || !quantity || !orderId || !price) {
            return res.status(400).json({
                message: "Missing required fields: productVariantId, quantity, orderId, and price are required"
            });
        }

        // Validate numeric values
        if (quantity <= 0 || price <= 0) {
            return res.status(400).json({
                message: "Quantity and price must be positive numbers"
            });
        }

        // Check if order exists
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if product variant exists and has sufficient stock
        const productVariant = await prisma.productVariant.findUnique({
            where: { id: productVariantId }
        });

        if (!productVariant) {
            return res.status(404).json({ message: "Product variant not found" });
        }

        if (productVariant.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }

        const orderItem = await prisma.orderItem.create({
            data: {
                productVariantId,
                quantity,
                orderId,
                price
            },
            include: {
                productVariant: {
                    include: {
                        product: true
                    }
                },
                order: {
                    select: {
                        id: true,
                        status: true,
                        orderDate: true
                    }
                }
            }
        });

        // Update product variant stock
        await prisma.productVariant.update({
            where: { id: productVariantId },
            data: {
                stock: productVariant.stock - quantity
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
        const orderItems = await prisma.orderItem.findMany({
            include: {
                productVariant: {
                    include: {
                        product: true
                    }
                },
                order: {
                    select: {
                        id: true,
                        status: true,
                        orderDate: true,
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json(orderItems);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching order items", error: err });
    }
};

export const getOrderItemById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Order item ID is required" });
        }

        const orderItem = await prisma.orderItem.findUnique({
            where: { id },
            include: {
                productVariant: {
                    include: {
                        product: true
                    }
                },
                order: {
                    select: {
                        id: true,
                        status: true,
                        orderDate: true,
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
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
        const { quantity, price } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Order item ID is required" });
        }

        // Validate numeric values
        if ((quantity !== undefined && quantity <= 0) || (price !== undefined && price <= 0)) {
            return res.status(400).json({
                message: "Quantity and price must be positive numbers"
            });
        }

        // Get current order item to check stock difference
        const currentOrderItem = await prisma.orderItem.findUnique({
            where: { id },
            include: {
                productVariant: true
            }
        });

        if (!currentOrderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        // If quantity is being updated, check stock availability
        if (quantity !== undefined && quantity !== currentOrderItem.quantity) {
            const stockDifference = currentOrderItem.quantity - quantity;
            const newStock = currentOrderItem.productVariant.stock + stockDifference;

            if (newStock < 0) {
                return res.status(400).json({ message: "Insufficient stock available" });
            }

            // Update product variant stock
            await prisma.productVariant.update({
                where: { id: currentOrderItem.productVariantId },
                data: { stock: newStock }
            });
        }

        const orderItem = await prisma.orderItem.update({
            where: { id },
            data: {
                ...(quantity !== undefined && { quantity }),
                ...(price !== undefined && { price })
            },
            include: {
                productVariant: {
                    include: {
                        product: true
                    }
                },
                order: {
                    select: {
                        id: true,
                        status: true,
                        orderDate: true
                    }
                }
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

        if (!id) {
            return res.status(400).json({ message: "Order item ID is required" });
        }

        // Get the order item to restore stock before deletion
        const orderItem = await prisma.orderItem.findUnique({
            where: { id },
            include: {
                productVariant: true
            }
        });

        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        // Restore stock to product variant
        await prisma.productVariant.update({
            where: { id: orderItem.productVariantId },
            data: {
                stock: orderItem.productVariant.stock + orderItem.quantity
            }
        });

        await prisma.orderItem.delete({
            where: { id }
        });

        return res.status(200).json({ 
            message: "Order item deleted successfully",
            restoredStock: orderItem.quantity
        });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting order item", error: err });
    }
};
