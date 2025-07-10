import { Router } from "express";
import { getAllOrders, getOrderById, getOrdersByUser, updateOrderStatus } from "../controllers/order";
import { createOrder } from "../controllers/order";

const orderRouter = Router();

orderRouter.post('/', createOrder);
orderRouter.get('/', getAllOrders);
orderRouter.get('/:orderId', getOrderById);
orderRouter.get('/user/:userId', getOrdersByUser);
orderRouter.put('/:orderId/status', updateOrderStatus);

export default orderRouter;
    