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

export const createOption = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, productOptionGroupId } = req.body;

        if (!name || !productOptionGroupId) {
            return res.status(400).json({
                message: "Name and productOptionGroupId are required"
            });
        }

        // Check if option group exists
        const optionGroup = await prisma.productOptionGroup.findUnique({
            where: { id: parseInt(productOptionGroupId) }
        });

        if (!optionGroup) {
            return res.status(404).json({ message: "Option group not found" });
        }

        const option = await prisma.productOption.create({
            data: {
                name,
                productOptionGroupId: parseInt(productOptionGroupId)
            },
            include: {
                productOptionGroup: {
                    include: {
                        product: true
                    }
                },
                productVariants: true
            }
        });
        return res.status(201).json(option);
    } catch (err) {
        return res.status(500).json({ message: "Error creating product option", error: err });
    }
};

export const getAllOptions = async (_req: Request, res: Response): Promise<any> => {
    try {
        const options = await prisma.productOption.findMany({
            include: {
                productOptionGroup: {
                    include: {
                        product: true
                    }
                },
                productVariants: true
            }
        });
        return res.status(200).json(options);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching product options", error: err });
    }
};

export const getOptionById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const option = await prisma.productOption.findUnique({
            where: { id: parseInt(id) },
            include: {
                productOptionGroup: {
                    include: {
                        product: true
                    }
                },
                productVariants: true
            }
        });
        if (!option) {
            return res.status(404).json({ message: "Product option not found" });
        }
        return res.status(200).json(option);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching product option", error: err });
    }
};

export const getOptionsByGroup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { optionGroupId } = req.params;
        const options = await prisma.productOption.findMany({
            where: { productOptionGroupId: parseInt(optionGroupId) },
            include: {
                productOptionGroup: {
                    include: {
                        product: true
                    }
                },
                productVariants: true
            }
        });
        return res.status(200).json(options);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching options by group", error: err });
    }
};

export const updateOption = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required for update" });
        }

        const option = await prisma.productOption.update({
            where: { id: parseInt(id) },
            data: { name },
            include: {
                productOptionGroup: {
                    include: {
                        product: true
                    }
                },
                productVariants: true
            }
        });
        return res.status(200).json(option);
    } catch (err) {
        return res.status(500).json({ message: "Error updating product option", error: err });
    }
};

export const deleteOption = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Check if option exists and has variants
        const option = await prisma.productOption.findUnique({
            where: { id: parseInt(id) },
            include: {
                productVariants: true
            }
        });

        if (!option) {
            return res.status(404).json({ message: "Product option not found" });
        }

        if (option.productVariants.length > 0) {
            return res.status(400).json({
                message: "Cannot delete option with associated variants",
                variantCount: option.productVariants.length
            });
        }

        await prisma.productOption.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({
            message: "Product option deleted successfully",
            deletedOption: {
                id: option.id,
                name: option.name
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting product option", error: err });
    }
};
