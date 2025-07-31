import { Router } from "express";
import { createVariant, deleteVariant, getAllVariants, getVariantById, getVariantsByProduct, updateVariant } from "../controllers/product-variant";
import upload from "../config/multer";

const productVariantRouter = Router();

productVariantRouter.post('/', upload.array("images"), createVariant);
productVariantRouter.get('/', getAllVariants);
productVariantRouter.get('/:id', getVariantById);
productVariantRouter.get('/product/:productId', getVariantsByProduct);
productVariantRouter.put('/:id', upload.array("images"), updateVariant);
productVariantRouter.delete('/:id', deleteVariant);

export default productVariantRouter;
