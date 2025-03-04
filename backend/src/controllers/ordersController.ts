import { Request, Response } from "express";
import Order from "../models/orders";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/auth";
import mongoose from "mongoose";

export const createOrder = async (req: Request, res: Response) => {
  try {
    console.log("📥 Datos recibidos en createOrder:", req.body);

    const authReq = req as AuthRequest;

    if (!authReq.user) {
      console.error("❌ Error: Usuario no autenticado");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { products } = req.body;

    for (const item of products) {
      console.log("🔍 Buscando producto con ID:", item.productId);
    
      // 🔥 Buscar en `Product` en vez de `Order`
      const product = await Product.findById(item.productId.trim());
    
      if (!product) {
        console.error("❌ Producto no encontrado:", item.productId);
        return res.status(404).json({ message: `Producto no encontrado: ${item.productId}` });
      }
    
      console.log("✅ Producto encontrado:", product.name);
      console.log("🆔 Producto encontrado con ID:", product._id.toString()); // ✅ Aquí dentro del for
    }

    res.status(201).json({ message: "✅ Orden creada con éxito" });
  } catch (error) {
    console.error("🔥 Error en createOrder:", error);
    res.status(500).json({ message: "❌ Error interno en el servidor" });
  }
};
