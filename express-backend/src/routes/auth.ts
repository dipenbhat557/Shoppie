import { Router } from "express";
import { login, register, logout, refreshToken } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;