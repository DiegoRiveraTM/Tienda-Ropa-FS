import { Request, Response, NextFunction, Router } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { login, register } from '../controllers/authController';

dotenv.config();

// 🔹 Validamos que JWT_SECRET exista antes de iniciar el servidor
if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR: JWT_SECRET no está definido en .env");
  process.exit(1); // Detiene el servidor si falta la clave secreta
}

// Definir la estructura esperada del payload del JWT, incluyendo el rol
interface DecodedUser extends JwtPayload {
  id: string;
  email: string;
  role: string; // <-- Agregamos el rol
}

// Extendemos Request para incluir `user`
export interface AuthRequest extends Request {
  user?: DecodedUser;
}

// Middleware para verificar token
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization; // ⬅️ Accede correctamente al header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: 'No token provided or malformed' });
    return;
  }

  const token = authHeader.split(" ")[1]; // ⬅️ Extraemos el token

  const secret = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secret) as DecodedUser;
    req.user = decoded; // ⬅️ Ahora req.user incluye id, email y role
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.error("❌ ERROR: Token expirado");
      res.status(401).json({ message: "Token expirado" });
    } else {
      console.error("❌ ERROR: Token inválido:", err);
      res.status(401).json({ message: "Token inválido" });
    }
  }
};

// Definimos las rutas de autenticación
const router = Router();

router.post('/login', login);
router.post('/register', register);

// Ruta protegida: obtener perfil del usuario autenticado
router.get("/profile", verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al obtener el perfil" });
  }
});

export default router;
