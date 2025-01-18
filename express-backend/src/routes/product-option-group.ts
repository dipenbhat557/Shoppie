import { Router } from "express";
import { createOptionGroup } from "../controllers/product-option-group";
import { getAllOptionGroups } from "../controllers/product-option-group";
import { getOptionGroupById } from "../controllers/product-option-group";
import { getByCategory, updateOptionGroup } from "../controllers/product-option-group";
import { deleteOptionGroup } from "../controllers/product-option-group";
import { addOptionGroupToCategory } from "../controllers/product-option-group";

const productOptionGroupRouter = Router();

productOptionGroupRouter.post('/', createOptionGroup);
productOptionGroupRouter.get('/', getAllOptionGroups);
productOptionGroupRouter.get('/:id', getOptionGroupById);
productOptionGroupRouter.get('/category/:categoryId', getByCategory);
productOptionGroupRouter.put('/:id', updateOptionGroup);
productOptionGroupRouter.delete('/:id', deleteOptionGroup);
productOptionGroupRouter.post('/:optionGroupId/category/:categoryId', addOptionGroupToCategory);

export default productOptionGroupRouter;
