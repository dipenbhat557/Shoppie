import { Request, Response } from "express";
import prisma from "../config/prisma";
import { deleteFile, getExactFileUrl, uploadToS3 } from "../utils/s3";

export const createVariant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId, price, stock, sku, optionIds, storeId } = req.body;

        if (!productId || !price || stock === undefined || !sku) {
            return res.status(400).json({
                message: "Missing required fields: productId, price, stock, and sku are required"
            });
        }

        if (price < 0 || stock < 0) {
            return res.status(400).json({
                message: "Price and stock must be non-negative numbers"
            });
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const images = req.files as Express.Multer.File[];
        let imageUrls: string[] = [];
        
        if (images?.length > 0) {
            imageUrls = await Promise.all(images.map(async (image) => {
                const url = await uploadToS3(image);
                return url;
            }));
        }

        const baseData = {
            sku,
            productId,
            price: parseInt(price),
            stock: parseInt(stock),
            images: imageUrls,
            ...(optionIds && {
                productOptions: {
                    connect: optionIds.map((id: string) => ({ id }))
                }
            })
        };

        if (storeId) {
            Object.assign(baseData, { storeId });
        }

        const variant = await prisma.productVariant.create({
            data: baseData,
            include: {
                product: true,
                productOptions: {
                    include: {
                        productOptionGroup: true
                    }
                },
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

        const formattedVariants = await Promise.all(variants.map(async (variant: any) => ({
            ...variant,
            images: variant.images.map(async (image: string) => await getExactFileUrl(image))
        })));

        return res.status(200).json(formattedVariants);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching product variants", error: err });
    }
};

export const getVariantById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Variant ID is required" });
        }

        const variant = await prisma.productVariant.findUnique({
            where: { id },
            include: {
                product: true,
                productOptions: true,
                store: true
            }
        });

        if (!variant) {
            return res.status(404).json({ message: "Product variant not found" });
        }

        const formattedVariant = {
            ...variant,
            images: await Promise.all(variant.images.map(async (image: string) => await getExactFileUrl(image)))
        };

        return res.status(200).json(formattedVariant);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching product variant", error: err });
    }
};

export const getVariantsByProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const variants = await prisma.productVariant.findMany({
            where: { productId },
            include: {
                product: true,
                productOptions: true,
                store: true
            }
        });

        const variantsWithImages = await Promise.all(variants.map(async (variant: any) => ({
            ...variant,
            images: await Promise.all(variant.images.map(async (image: string) => await getExactFileUrl(image)))
        })));

        return res.status(200).json(variantsWithImages);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching variants by product", error: err });
    }
};

export const updateVariant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { price, stock, sku, storeId, optionIds } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Variant ID is required" });
        }

        if ((price !== undefined && price < 0) || (stock !== undefined && stock < 0)) {
            return res.status(400).json({
                message: "Price and stock must be non-negative numbers"
            });
        }

        const images = req.files as Express.Multer.File[];
        let imageUrls: string[] = [];
        
        if (images.length > 0) {
            imageUrls = await Promise.all(images.map(async (image) => {
                const url = await uploadToS3(image);
                return url;
            }));
        }

        const variant = await prisma.productVariant.update({
            where: { id },
            data: {
                ...(price !== undefined && { price: parseInt(price) }),
                ...(stock !== undefined && { stock: parseInt(stock) }),
                ...(sku && { sku }),
                ...(storeId !== undefined && { storeId }),
                ...(optionIds && {
                    productOptions: {
                        set: optionIds.map((id: string) => ({ id }))
                    }
                }),
                ...(imageUrls.length > 0 && { images: imageUrls })
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

        if (!id) {
            return res.status(400).json({ message: "Variant ID is required" });
        }

        const variant = await prisma.productVariant.findUnique({
            where: { id },
            include: {
                cartItems: true,
                orderItems: true
            }
        });

        if (!variant) {
            return res.status(404).json({ message: "Product variant not found" });
        }

        if (variant.cartItems.length > 0 || variant.orderItems.length > 0) {
            return res.status(400).json({
                message: "Cannot delete variant with associated cart items or orders",
                cartItemCount: variant.cartItems.length,
                orderItemCount: variant.orderItems.length
            });
        }

        await prisma.productVariant.delete({
            where: { id }
        });

        if (variant.images.length > 0) {
            await Promise.all(variant.images.map(async (image: string) => await deleteFile(image)));
        }

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
