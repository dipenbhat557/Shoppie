import { Router, Request, Response } from "express";
import { deleteProduct, getAllProducts, getProductById, getProductsByBrand, getProductsByCategory, getProductsBySale, getProductsByWishlist, updateProduct } from "../controllers/product";
import { createProduct } from "../controllers/product";
import upload from "../config/multer";

const productRouter = Router();

productRouter.post("/", upload.single('image'), createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", upload.single('image'), updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/wishlist/:wishlistId", getProductsByWishlist);
productRouter.get("/sale/:saleId", getProductsBySale);
productRouter.get("/category/:categoryId", getProductsByCategory);
productRouter.get("/brand/:brandId", getProductsByBrand);

export default productRouter;
