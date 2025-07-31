import { Router } from "express";
import { createAddress, deleteAddress, getAddress, listAddresses, setPrimaryAddress, updateAddress } from "../controllers/address";

const addressRouter = Router();

addressRouter.post("/", createAddress);
addressRouter.get("/", listAddresses);
addressRouter.get("/:id", getAddress);
addressRouter.put("/:id", updateAddress);
addressRouter.delete("/:id", deleteAddress);
addressRouter.put("/primary/:id/:userId", setPrimaryAddress);

export default addressRouter;
