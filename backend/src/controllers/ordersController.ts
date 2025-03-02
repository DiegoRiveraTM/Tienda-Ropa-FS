import { Request, Response } from "express";
import Order from "../models/orders";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
import mongoose from "mongoose";

// Crear una orden (Compra)
export const createOrder = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    console.log("📥 Datos recibidos en createOrder:", JSON.stringify(req.body, null, 2));
  
    try {
      // Verificar si el usuario está autenticado
      if (!req.user) {
        console.error("🚫 Error: Usuario no autenticado.");
        res.status(401).json({ message: "No autorizado" });
        return;
      }
  
      const { products } = req.body;
  
      // Validación de los productos
      if (!products || !Array.isArray(products) || products.length === 0) {
        console.error("🚫 Error: No se enviaron productos en la orden.");
        res.status(400).json({ message: "No se recibieron productos en la orden" });
        return;
      }
  
      let total = 0;
      const orderProducts = [];
  
     // Verificación y cálculo del total de la orden
// Buscar productos en la base de datos asegurando que `productId` sea un ObjectId
for (const item of req.body.products) {
  console.log("🔍 Buscando producto con ID:", item.productId);

  const product = await Product.findOne({ id: item.productId });

  if (!product) {
      console.error(`🚫 Producto con ID ${item.productId} no encontrado.`);
      res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado.` });
      return;
  }

  total += product.price * item.quantity;
  orderProducts.push({ product: product._id, quantity: item.quantity });
}
  
      // Crear la nueva orden en la base de datos
      console.log("📝 Creando nueva orden...");
      const newOrder = new Order({
        user: req.user._id,
        products: orderProducts,
        total,
        status: "pendiente",
      });
  
      await newOrder.save();
      console.log("✅ Orden creada con éxito:", newOrder);
  
      // Responder con el mensaje de éxito y la información de la orden
      res.status(201).json({ message: "Compra realizada con éxito", order: newOrder });
    } catch (error) {
      console.error("🔥 Error inesperado en createOrder:", error);
      res.status(500).json({ message: "Error interno al procesar la orden" });
    }
  });