import { Router } from "express";
import { createWishlist, getWishlistById, getAllWishlists, getWishlistByUser, updateWishlist, deleteWishlist } from "../controllers/wishlist";

const wishlistRouter = Router();

wishlistRouter.post("/", createWishlist);
wishlistRouter.get("/:id", getWishlistById);
wishlistRouter.get("/", getAllWishlists);
wishlistRouter.get("/user/:userId", getWishlistByUser);
wishlistRouter.put("/:id", updateWishlist);
wishlistRouter.delete("/:id", deleteWishlist);

export default wishlistRouter;
