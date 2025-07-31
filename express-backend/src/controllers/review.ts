import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createReview = async (req: Request, res: Response): Promise<any> => {
	try {
		const { rating, comment, userId, productId } = req.body;
		const review = await prisma.review.create({
			data: {
				rating,
				comment,
				userId,
				productId
			}
		});
		return res.status(200).json(review);
	} catch (err) {
		return res.status(500).json({ message: "Error creating review", error: err });
	}
};

export const getAllReviews = async (req: Request, res: Response): Promise<any> => {
	try {
		const reviews = await prisma.review.findMany();
		return res.status(200).json(reviews);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching reviews", error: err });
	}
};

export const getReviewById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const review = await prisma.review.findUnique({
			where: { id }
		});
		if (!review) {
			return res.status(404).json({ message: "Review not found" });
		}
		return res.status(200).json(review);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching review", error: err });
	}
};

export const getReviewsByUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const { userId } = req.params;
		const reviews = await prisma.review.findMany({
			where: { userId }
		});
		return res.status(200).json(reviews);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching reviews by user", error: err });
	}
};

export const getReviewsByProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		const { productId } = req.params;
		const reviews = await prisma.review.findMany({
			where: { productId }
		});
		return res.status(200).json(reviews);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching reviews by product", error: err });
	}
};

export const updateReview = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const { rating, comment } = req.body;
		const review = await prisma.review.update({
			where: { id },
			data: {
				rating,
				comment
			}
		});
		return res.status(200).json(review);
	} catch (err) {
		return res.status(500).json({ message: "Error updating review", error: err });
	}
};

export const deleteReview = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.review.delete({
			where: { id }
		});
		return res.status(200).json({ message: "Review deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting review", error: err });
	}
};
