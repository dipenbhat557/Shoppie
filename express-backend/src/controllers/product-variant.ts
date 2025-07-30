import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createVariant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId, price, stock, sku, optionIds, storeId } = req.body;

        // Validate required fields
        if (!productId || !price || stock === undefined || !sku) {
            return res.status(400).json({
                message: "Missing required fields: productId, price, stock, and sku are required"
            });
        }

        // Validate numeric values
        if (price < 0 || stock < 0) {
            return res.status(400).json({
                message: "Price and stock must be non-negative numbers"
            });
        }

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const variant = await prisma.productVariant.create({
            data: {
                sku,
                productId,
                price,
                stock,
                storeId,
                ...(optionIds && {
                    productOptions: {
                        connect: optionIds.map((id: number) => ({ id }))
                    }
                })
            },
            include: {
                product: true,
                productOptions: true,
                store: true
            }
        });

        return res.status(201).json(variant);
    } catch (err) {
        console.error('Create product variant error:', err);
        return res.status(500).json({ message: "Error creating product variant", error: err });
    }
};

export const getAllVariants = async (_req: Request, res: Response): Promise<any> => {
    try {
        const variants = await prisma.productVariant.findMany({
            include: {
                product: true,
                productOptions: true,
                store: true
            }
        });
        return res.status(200).json(variants);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching product variants", error: err });
    }
};

export const getVariantById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid variant ID" });
        }

        const variant = await prisma.productVariant.findUnique({
            where: { id: parseInt(id) },
            include: {
                product: true,
                productOptions: true,
                store: true
            }
        });

        if (!variant) {
            return res.status(404).json({ message: "Product variant not found" });
        }

        return res.status(200).json(variant);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching product variant", error: err });
    }
};

export const getVariantsByProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId } = req.params;

        if (!productId || isNaN(parseInt(productId))) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const variants = await prisma.productVariant.findMany({
            where: { productId: parseInt(productId) },
            include: {
                product: true,
                productOptions: true,
                store: true
            }
        });
        return res.status(200).json(variants);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching variants by product", error: err });
    }
};

export const updateVariant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { price, stock, sku, storeId, optionIds } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid variant ID" });
        }

        // Validate numeric values if provided
        if ((price !== undefined && price < 0) || (stock !== undefined && stock < 0)) {
            return res.status(400).json({
                message: "Price and stock must be non-negative numbers"
            });
        }

        const variant = await prisma.productVariant.update({
            where: { id: parseInt(id) },
            data: {
                ...(price !== undefined && { price }),
                ...(stock !== undefined && { stock }),
                ...(sku && { sku }),
                ...(storeId !== undefined && { storeId }),
                ...(optionIds && {
                    productOptions: {
                        set: optionIds.map((id: number) => ({ id }))
                    }
                })
            },
            include: {
                product: true,
                productOptions: true,
                store: true
            }
        });

        return res.status(200).json(variant);
    } catch (err) {
        console.error('Update product variant error:', err);
        return res.status(500).json({ message: "Error updating product variant", error: err });
    }
};

export const deleteVariant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid variant ID" });
        }

        // Check if variant exists and get its details for the response
        const variant = await prisma.productVariant.findUnique({
            where: { id: parseInt(id) },
            include: {
                cartItems: true,
                orderItems: true
            }
        });

        if (!variant) {
            return res.status(404).json({ message: "Product variant not found" });
        }

        // Check for related cart items or order items
        if (variant.cartItems.length > 0 || variant.orderItems.length > 0) {
            return res.status(400).json({
                message: "Cannot delete variant with associated cart items or orders",
                cartItemCount: variant.cartItems.length,
                orderItemCount: variant.orderItems.length
            });
        }

        await prisma.productVariant.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({
            message: "Product variant deleted successfully",
            deletedVariant: {
                id: variant.id,
                sku: variant.sku,
                price: variant.price,
                stock: variant.stock
            }
        });
    } catch (err) {
        console.error('Delete product variant error:', err);
        return res.status(500).json({ message: "Error deleting product variant", error: err });
    }
};
