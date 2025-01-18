import { Router } from "express";
import { createSale, getSaleById, getAllSales, getActiveSales, updateSale, deleteSale } from "../controllers/sale";

const saleRouter = Router();

saleRouter.post("/", createSale);
saleRouter.get("/:id", getSaleById);
saleRouter.get("/", getAllSales);
saleRouter.get("/active", getActiveSales);
saleRouter.put("/:id", updateSale);
saleRouter.delete("/:id", deleteSale);

export default saleRouter;
