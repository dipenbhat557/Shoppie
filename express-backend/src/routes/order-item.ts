import { Router } from "express";
import { createOrderItem, deleteOrderItem, getAllOrderItems, getOrderItemById, updateOrderItem } from "../controllers/order-item";

const orderItemRouter = Router();

orderItemRouter.post('/', createOrderItem);
orderItemRouter.get('/', getAllOrderItems);
orderItemRouter.get('/:id', getOrderItemById);
orderItemRouter.put('/:id', updateOrderItem);
orderItemRouter.delete('/:id', deleteOrderItem);

export default orderItemRouter;
