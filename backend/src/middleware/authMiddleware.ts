import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users";

export interface AuthRequest extends Request {
  user?: { _id: string; name: string; email: string; role: string };
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "❌ No autorizado" });
      return; // Retorna void, no devuelve el objeto Response
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select("-password") as { _id: string; name: string; email: string; role: string };

    if (!user) {
      res.status(401).json({ message: "❌ Usuario no encontrado" });
      return;
    }

    req.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next(); // Llama a next() sin retornar nada
  } catch (error) {
    res.status(401).json({ message: "❌ Token inválido" });
    return;
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Verificar que req.user existe y tiene el rol "admin"
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ message: "❌ Acceso denegado: se requiere permiso de administrador" });
      return;
    }
    next();
  };