import { Router } from "express";
import { createOptionGroup } from "../controllers/product-option-group";
import { getAllOptionGroups } from "../controllers/product-option-group";
import { getOptionGroupById } from "../controllers/product-option-group";
import { getByProduct } from "../controllers/product-option-group";
import { updateOptionGroup } from "../controllers/product-option-group";
import { deleteOptionGroup } from "../controllers/product-option-group";

const productOptionGroupRouter = Router();

productOptionGroupRouter.post('/', createOptionGroup);
productOptionGroupRouter.get('/', getAllOptionGroups);
productOptionGroupRouter.get('/:id', getOptionGroupById);
productOptionGroupRouter.get('/product/:productId', getByProduct);
productOptionGroupRouter.put('/:id', updateOptionGroup);
productOptionGroupRouter.delete('/:id', deleteOptionGroup);

export default productOptionGroupRouter;
