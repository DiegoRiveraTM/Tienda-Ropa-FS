import express, { Request, Response, NextFunction } from "express";
import { authenticateUser, isAdmin, AuthRequest } from "../middleware/auth";
import Order from "../models/orders";
import Product from "../models/Product";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

// ✅ Crear una orden (Compra)
router.post("/", authenticateUser, asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    void res.status(401).json({ message: "❌ No autorizado" });
    return;
  }
  const { products } = req.body;
  let total = 0;
  for (const item of products) {
    const product = await Product.findById(item.product);
    if (!product) {
      void res.status(404).json({ message: "❌ Producto no encontrado" });
      return;
    }
    total += product.price * (item.quantity || 1);
  }
  const newOrder = new Order({
    user: req.user._id,
    products,
    total,
  });
  await newOrder.save();
  void res.status(201).json({ message: "✅ Compra realizada con éxito", order: newOrder });
  return;
}));

// ✅ Obtener compras del usuario autenticado
router.get("/my-orders", authenticateUser, asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    void res.status(401).json({ message: "❌ No autorizado" });
    return;
  }
  const orders = await Order.find({ user: req.user._id }).populate("products.product");
  void res.status(200).json(orders);
  return;
}));

// ✅ Obtener todas las compras (Admin)
router.get("/", authenticateUser, isAdmin, asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product");
  void res.status(200).json(orders);
  return;
}));

export default router;
