import { Router } from "express";
import { addOrderItem, getAllOrders, getOrderById, getOrdersByUser } from "../controllers/order";
import { createOrder } from "../controllers/order";

const orderRouter = Router();

orderRouter.post('/', createOrder);
orderRouter.get('/', getAllOrders);
orderRouter.get('/:orderId', getOrderById);
orderRouter.get('/user/:userId', getOrdersByUser);
orderRouter.post('/:orderId/items', addOrderItem);

export default orderRouter;
