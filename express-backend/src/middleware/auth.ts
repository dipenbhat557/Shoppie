import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: any): any => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("token received in backend", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "mysupersecretkey") as any;

    console.log("decoded token in backend", decoded);

    if (!decoded || decoded.userId !== "I AM VERIFIED") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
