import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category";
import upload from "../config/multer";

const categoryRouter = express.Router();

categoryRouter.post('/', upload.single('file'), createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put('/:id', upload.single('file'), updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
