import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/Users';

dotenv.config();

export interface AuthRequest extends Request {
  user?: { _id: string; name: string; email: string; role: string };
}

interface DecodedUser extends JwtPayload {
  id: string;
  email: string;
  role?: string;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).json({ message: "❌ No token provided" });
      return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('❌ ERROR: JWT_SECRET no está definido.');
      res.status(500).json({ message: "❌ Error interno del servidor" });
      return;
    }

    const decoded = jwt.verify(token, secret) as DecodedUser;
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
    next();
  } catch (error) {
    console.error("❌ Error en verifyToken:", error);
    res.status(401).json({ message: "❌ Token inválido" });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: "❌ Acceso denegado: solo administradores" });
    return;
  }
  next();
}; 

export const authenticateUser = verifyToken;
