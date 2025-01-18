import { Router } from "express";
import { createVariant, deleteVariant, getAllVariants, getVariantById, getVariantsByProduct, updateVariant } from "../controllers/product-variant";

const productVariantRouter = Router();

productVariantRouter.post('/', createVariant);
productVariantRouter.get('/', getAllVariants);
productVariantRouter.get('/:id', getVariantById);
productVariantRouter.get('/product/:productId', getVariantsByProduct);
productVariantRouter.put('/:id', updateVariant);
productVariantRouter.delete('/:id', deleteVariant);

export default productVariantRouter;
