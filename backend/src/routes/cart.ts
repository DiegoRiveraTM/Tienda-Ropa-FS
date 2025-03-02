import { Router } from "express";
import { addToCart, getCart, removeFromCart, updateCart } from "../controllers/cartController";
import { authenticateUser } from "../middleware/authMiddleware"; // ✅ Usa `authenticateUser`
import { verifyToken } from "./auth";

const router = Router();

// 📌 Asegura que esta ruta exista
router.post("/cart", verifyToken, addToCart);
router.get("/cart", verifyToken, getCart);
router.delete("/cart/:id", verifyToken, removeFromCart);
router.put("/cart", verifyToken, updateCart);

export default router;
