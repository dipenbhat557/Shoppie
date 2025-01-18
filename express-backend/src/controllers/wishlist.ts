import { Request, Response } from "express";
import prisma from "../config/prisma";

// Create new wishlist
export const createWishlist = async (req: Request, res: Response): Promise<any> => {
	try {
		const { userId, productIds } = req.body;
		const wishlist = await prisma.wishlist.create({
			data: {
				userId,
				products: {
					connect: productIds.map((id: number) => ({ id }))
				}
			}
		});
		return res.status(201).json(wishlist);
	} catch (err) {
		return res.status(400).json({ message: "Error creating wishlist", error: err });
	}
};

// Get wishlist by ID
export const getWishlistById = async (req: Request, res: Response): Promise<any> => {
	try {
		const id = parseInt(req.params.id);
		const wishlist = await prisma.wishlist.findUnique({
			where: { id },
			include: { products: true }
		});
		
		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found" });
		}
		return res.status(200).json(wishlist);
	} catch (err) {
		return res.status(500).json({ message: "Error retrieving wishlist", error: err });
	}
};

// Get all wishlists
export const getAllWishlists = async (req: Request, res: Response): Promise<any> => {
	try {
		const wishlists = await prisma.wishlist.findMany({
			include: { products: true }
		});
		return res.status(200).json(wishlists);
	} catch (err) {
		return res.status(500).json({ message: "Error retrieving wishlists", error: err });
	}
};

// Get wishlist by user ID
export const getWishlistByUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const userId = parseInt(req.params.userId);
		const wishlist = await prisma.wishlist.findUnique({
			where: { userId },
			include: { products: true }
		});
		
		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found for user" });
		}
		return res.status(200).json(wishlist);
	} catch (err) {
		return res.status(500).json({ message: "Error retrieving user wishlist", error: err });
	}
};

// Update wishlist
export const updateWishlist = async (req: Request, res: Response): Promise<any> => {
	try {
		const id = parseInt(req.params.id);
		const { productIds } = req.body;
		
		const wishlist = await prisma.wishlist.update({
			where: { id },
			data: {
				products: {
					set: productIds.map((id: number) => ({ id }))
				}
			},
			include: { products: true }
		});
		return res.status(200).json(wishlist);
	} catch (err) {
		return res.status(400).json({ message: "Error updating wishlist", error: err });
	}
};

// Delete wishlist
export const deleteWishlist = async (req: Request, res: Response): Promise<any> => {
	try {
		const id = parseInt(req.params.id);
		await prisma.wishlist.delete({
			where: { id }
		});
		return res.status(200).json({ message: "Wishlist deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting wishlist", error: err });
	}
};
