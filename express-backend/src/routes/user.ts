import { Router } from "express";
import { createUser, getUser, getAllUsers, updateUser, deleteUser, verifyUser } from "../controllers/user";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.get("/:id", getUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/verify/:id", verifyUser);

export default userRouter;
