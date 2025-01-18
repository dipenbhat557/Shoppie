import { Router, Request, Response } from "express";
import { createReview, getAllReviews, getReviewById, getReviewsByProduct, getReviewsByUser, updateReview, deleteReview } from "../controllers/review";

const reviewRouter = Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.get("/user/:userId", getReviewsByUser);
reviewRouter.get("/product/:productId", getReviewsByProduct);
reviewRouter.put("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
