import { Router } from "express";
import {
  createPromotion,
  deletePromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion
} from "../controllers/promotion";

const promotionRouter = Router();

promotionRouter.post('/', createPromotion);
promotionRouter.get('/', getAllPromotions);
promotionRouter.get('/:id', getPromotionById);
promotionRouter.put('/:id', updatePromotion);
promotionRouter.delete('/:id', deletePromotion);

export default promotionRouter;