import { Router, Request, Response } from "express";
import { createOption, getAllOptions, getOptionById, getOptionsByGroup, updateOption, deleteOption } from "../controllers/product-option";  

const productOptionRouter = Router();

productOptionRouter.post('/', createOption);
productOptionRouter.get('/', getAllOptions);
productOptionRouter.get('/:id', getOptionById);
productOptionRouter.get('/group/:optionGroupId', getOptionsByGroup);
productOptionRouter.put('/:id', updateOption);
productOptionRouter.delete('/:id', deleteOption);

export default productOptionRouter;
