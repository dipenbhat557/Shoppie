import { Router } from "express";
import { createStore, getAllStores, getStoreById, updateStore, deleteStore } from "../controllers/store";

const storeRouter = Router();

storeRouter.post("/", createStore);
storeRouter.get("/", getAllStores);
storeRouter.get("/:id", getStoreById);
storeRouter.put("/:id", updateStore);
storeRouter.delete("/:id", deleteStore);

export default storeRouter;