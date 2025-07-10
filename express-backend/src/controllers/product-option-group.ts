import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOptionGroup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required for option group"
            });
        }

        const optionGroup = await prisma.productOptionGroup.create({
            data: { name },
            include: {
                productOptions: true,
                categories: true
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
                categories: true
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
                categories: true
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

export const getByCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { categoryId } = req.params;

        if (!categoryId || isNaN(parseInt(categoryId))) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const optionGroups = await prisma.productOptionGroup.findMany({
            where: {
                categories: {
                    some: {
                        id: parseInt(categoryId)
                    }
                }
            },
            include: {
                productOptions: true,
                categories: true
            }
        });
        return res.status(200).json(optionGroups);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching option groups by category", error: err });
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
                categories: true
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

        if (optionGroup.productOptions.length > 0) {
            return res.status(400).json({
                message: "Cannot delete option group with associated options",
                optionCount: optionGroup.productOptions.length
            });
        }

        await prisma.productOptionGroup.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({
            message: "Option group deleted successfully",
            deletedGroup: {
                id: optionGroup.id,
                name: optionGroup.name
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting option group", error: err });
    }
};

export const addOptionGroupToCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { optionGroupId, categoryId } = req.params;

        if (!optionGroupId || isNaN(parseInt(optionGroupId)) || !categoryId || isNaN(parseInt(categoryId))) {
            return res.status(400).json({ message: "Invalid option group ID or category ID" });
        }

        // Check if both option group and category exist
        const [optionGroup, category] = await Promise.all([
            prisma.productOptionGroup.findUnique({ where: { id: parseInt(optionGroupId) } }),
            prisma.category.findUnique({ where: { id: parseInt(categoryId) } })
        ]);

        if (!optionGroup) {
            return res.status(404).json({ message: "Option group not found" });
        }

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const updatedOptionGroup = await prisma.productOptionGroup.update({
            where: { id: parseInt(optionGroupId) },
            data: {
                categories: {
                    connect: { id: parseInt(categoryId) }
                }
            },
            include: {
                productOptions: true,
                categories: true
            }
        });

        return res.status(200).json(updatedOptionGroup);
    } catch (err) {
        return res.status(500).json({ message: "Error adding option group to category", error: err });
    }
};

export const removeOptionGroupFromCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { optionGroupId, categoryId } = req.params;

        if (!optionGroupId || isNaN(parseInt(optionGroupId)) || !categoryId || isNaN(parseInt(categoryId))) {
            return res.status(400).json({ message: "Invalid option group ID or category ID" });
        }

        const updatedOptionGroup = await prisma.productOptionGroup.update({
            where: { id: parseInt(optionGroupId) },
            data: {
                categories: {
                    disconnect: { id: parseInt(categoryId) }
                }
            },
            include: {
                productOptions: true,
                categories: true
            }
        });

        return res.status(200).json(updatedOptionGroup);
    } catch (err) {
        return res.status(500).json({ message: "Error removing option group from category", error: err });
    }
};
