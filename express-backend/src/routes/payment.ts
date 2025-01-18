import { Router } from "express";
import { deletePayment, getAllPayments, getPaymentById, updatePayment } from "../controllers/payment";
import { createPayment } from "../controllers/payment";

const paymentRouter = Router();

paymentRouter.post('/', createPayment);
paymentRouter.get('/', getAllPayments);
paymentRouter.get('/:id', getPaymentById);
paymentRouter.put('/:id', updatePayment);
paymentRouter.delete('/:id', deletePayment);

export default paymentRouter;
