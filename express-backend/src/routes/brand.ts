import { Router } from "express";
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "../controllers/brand";
import upload from "../config/multer";


const brandRouter = Router();

brandRouter.post("/", upload.single('file'), createBrand);
brandRouter.get("/", getAllBrands);
brandRouter.get("/:id", getBrandById);
brandRouter.put("/:id", upload.single('file'), updateBrand);
brandRouter.delete("/:id", deleteBrand);

export default brandRouter;
