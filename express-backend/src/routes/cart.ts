import { Router } from "express";
import { addCartItem, deleteCart, getAll, getById, getCartByUserId, update } from "../controllers/cart";

const cartRouter = Router();

cartRouter.post("/:userId/items", addCartItem);
cartRouter.get("/:id", getById);
cartRouter.get("/", getAll);
cartRouter.get("/user/:userId", getCartByUserId);
cartRouter.put("/:id", update);
cartRouter.delete("/:id", deleteCart);

export default cartRouter;