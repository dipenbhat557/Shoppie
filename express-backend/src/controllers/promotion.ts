import { Request, Response } from "express";
import prisma from "../config/prisma";
import { PromotionStatus, PromotionType } from "@prisma/client";

export const createPromotion = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      name,
      description,
      type,
      value,
      startDate,
      endDate,
      usageLimit,
      couponCode,
      minOrderValue,
      productIds,
      categoryIds
    } = req.body;

    // Validate required fields
    if (!name || !type || !value || !startDate || !endDate) {
      return res.status(400).json({
        message: "Missing required fields: name, type, value, startDate, and endDate are required"
      });
    }

    // Validate promotion type
    if (!Object.values(PromotionType).includes(type)) {
      return res.status(400).json({
        message: "Invalid promotion type. Must be one of: " + Object.values(PromotionType).join(", ")
      });
    }

    const promotion = await prisma.promotion.create({
      data: {
        name,
        description,
        type,
        value,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        usageLimit,
        couponCode,
        minOrderValue,
        status: PromotionStatus.SCHEDULED,
        products: productIds ? {
          connect: productIds.map((id: number) => ({ id }))
        } : undefined,
        categories: categoryIds ? {
          connect: categoryIds.map((id: number) => ({ id }))
        } : undefined
      },
      include: {
        products: true,
        categories: true,
        orders: {
          include: {
            user: true
          }
        }
      }
    });

    return res.status(201).json(promotion);
  } catch (err) {
    console.error('Create promotion error:', err);
    return res.status(500).json({ message: "Error creating promotion", error: err });
  }
};

export const getAllPromotions = async (_req: Request, res: Response): Promise<any> => {
  try {
    const promotions = await prisma.promotion.findMany({
      include: {
        products: true,
        categories: true,
        orders: {
          include: {
            user: true
          }
        }
      }
    });
    return res.status(200).json(promotions);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching promotions", error: err });
  }
};

export const getPromotionById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const promotion = await prisma.promotion.findUnique({
      where: { id },
      include: {
        products: true,
        categories: true,
        orders: {
          include: {
            user: true
          }
        }
      }
    });

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    return res.status(200).json(promotion);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching promotion", error: err });
  }
};

export const updatePromotion = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      value,
      startDate,
      endDate,
      status,
      usageLimit,
      couponCode,
      minOrderValue,
      productIds,
      categoryIds
    } = req.body;

    const promotion = await prisma.promotion.update({
      where: { id },
      data: {
        name,
        description,
        type,
        value,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        status,
        usageLimit,
        couponCode,
        minOrderValue,
        products: productIds ? {
          set: productIds.map((id: number) => ({ id }))
        } : undefined,
        categories: categoryIds ? {
          set: categoryIds.map((id: number) => ({ id }))
        } : undefined
      },
      include: {
        products: true,
        categories: true,
        orders: {
          include: {
            user: true
          }
        }
      }
    });

    return res.status(200).json(promotion);
  } catch (err) {
    console.error('Update promotion error:', err);
    return res.status(500).json({ message: "Error updating promotion", error: err });
  }
};

export const deletePromotion = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    // Check if promotion exists and has associated orders
    const promotion = await prisma.promotion.findUnique({
      where: { id },
      include: {
        orders: true
      }
    });

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    // Don't allow deletion if promotion has associated orders
    if (promotion.orders.length > 0) {
      return res.status(400).json({
        message: "Cannot delete promotion with associated orders",
        orderCount: promotion.orders.length
      });
    }

    await prisma.promotion.delete({
      where: { id }
    });

    return res.status(200).json({
      message: "Promotion deleted successfully",
      deletedPromotion: promotion
    });
  } catch (err) {
    console.error('Delete promotion error:', err);
    return res.status(500).json({ message: "Error deleting promotion", error: err });
  }
};