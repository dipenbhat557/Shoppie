import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOptionGroup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, productId } = req.body;

        if (!name || !productId) {
            return res.status(400).json({
                message: "Name and productId are required for option group"
            });
        }

        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const optionGroup = await prisma.productOptionGroup.create({
            data: {
                name,
                productId: parseInt(productId)
            },
            include: {
                productOptions: true,
                product: true
            }
        });
        return res.status(201).json(optionGroup);
    } catch (err) {
        return res.status(500).json({ message: "Error creating option group", error: err });
    }
};

export const getAllOptionGroups = async (_req: Request, res: Response): Promise<any> => {
    try {
        const optionGroups = await prisma.productOptionGroup.findMany({
            include: {
                productOptions: true,
                product: true
            }
        });
        return res.status(200).json(optionGroups);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching option groups", error: err });
    }
};

export const getOptionGroupById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid option group ID" });
        }

        const optionGroup = await prisma.productOptionGroup.findUnique({
            where: { id: parseInt(id) },
            include: {
                productOptions: true,
                product: true
            }
        });

        if (!optionGroup) {
            return res.status(404).json({ message: "Option group not found" });
        }

        return res.status(200).json(optionGroup);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching option group", error: err });
    }
};

export const getByProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId } = req.params;

        if (!productId || isNaN(parseInt(productId))) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const optionGroups = await prisma.productOptionGroup.findMany({
            where: {
                productId: parseInt(productId)
            },
            include: {
                productOptions: true,
                product: true
            }
        });
        return res.status(200).json(optionGroups);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching option groups by product", error: err });
    }
};

export const updateOptionGroup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid option group ID" });
        }

        if (!name) {
            return res.status(400).json({ message: "Name is required for update" });
        }

        const optionGroup = await prisma.productOptionGroup.update({
            where: { id: parseInt(id) },
            data: { name },
            include: {
                productOptions: true,
                product: true
            }
        });

        return res.status(200).json(optionGroup);
    } catch (err) {
        return res.status(500).json({ message: "Error updating option group", error: err });
    }
};

export const deleteOptionGroup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid option group ID" });
        }

        // Check if option group exists and has associated options
        const optionGroup = await prisma.productOptionGroup.findUnique({
            where: { id: parseInt(id) },
            include: {
                productOptions: true
            }
        });

        if (!optionGroup) {
            return res.status(404).json({ message: "Option group not found" });
        }

        // Delete associated options first
        if (optionGroup.productOptions.length > 0) {
            await prisma.productOption.deleteMany({
                where: { productOptionGroupId: parseInt(id) }
            });
        }

        await prisma.productOptionGroup.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({
            message: "Option group and associated options deleted successfully",
            deletedGroup: {
                id: optionGroup.id,
                name: optionGroup.name
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting option group", error: err });
    }
};
