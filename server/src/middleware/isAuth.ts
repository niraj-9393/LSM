import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


interface JwtPayload {
    id: string;
}
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "No token in cookies" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if(!decoded) return res.status(401).json({ message: "unothorized.." });
        req.userId = decoded.id!; 
        next();
    } catch (error) {
        console.log("isAuth Error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};