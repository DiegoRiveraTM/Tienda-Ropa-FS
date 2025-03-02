import { Request, Response } from 'express';
import User from '../models/Users';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Email y contraseña son obligatorios" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Credenciales inválidas" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Credenciales inválidas" });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ ERROR: JWT_SECRET no está definido.");
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn: "1h" }
    );

    // 🔹 🔥 Convertimos `_id` a `id` para que el frontend lo entienda
    res.status(200).json({
      token,
      user: {
        id: user._id, // ✅ Cambiamos `_id` a `id`
        //        name: user.name, // Asegúrate de que el modelo tiene "name"
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: (error as any).message });
  }
};


export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email y contraseña son obligatorios" });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword, cart: [], role: "user" });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
