import { Request, Response } from "express";
import prisma from "../config/prisma"

export const addCartItem = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    const { productVariantId, quantity } = req.body;

    const cart = await prisma.cart.upsert({
      where: { userId: parseInt(userId) },
      create: {
        userId: parseInt(userId),
        items: {
          create: [{
            productVariantId: productVariantId,
            quantity: quantity
          }]
        }
      },
      update: {
        items: {
          create: [{
            productVariantId: productVariantId,
            quantity: quantity
          }]
        }
      },
      include: {
        items: true
      }
    });

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Error adding cart item", error: err });
  }
};

export const getById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const cart = await prisma.cart.findUnique({
      where: { id: parseInt(id) },
      include: { items: true }
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching cart", error: err });
  }
};

export const getAll = async (req: Request, res: Response): Promise<any> => {
  try {
    const carts = await prisma.cart.findMany({
      include: { items: true }
    });
    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching carts", error: err });
  }
};

export const getCartByUserId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) },
      include: { items: true }
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching cart", error: err });
  }
};

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const cart = await prisma.cart.update({
      where: { id: parseInt(id) },
      data: { userId: parseInt(userId as string) },
      include: { items: true }
    });

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Error updating cart", error: err });
  }
};

export const deleteCart = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    await prisma.cart.delete({
      where: { id: parseInt(id) }
    });
    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting cart", error: err });
  }
};