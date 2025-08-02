import { Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = (req: Request, res: Response, next: any) : any => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "fdasdfasdf")

  if (!decoded || decoded.trim() != "I AM VERIFIED") {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  next()
}
