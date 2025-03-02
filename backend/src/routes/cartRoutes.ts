import { Router } from "express";
import { addToCart, getCart, removeFromCart, updateCart } from "../controllers/cartController";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/cart", verifyToken, addToCart);
router.get("/cart", verifyToken, getCart);
router.delete("/cart/:id", verifyToken, removeFromCart);
router.put("/cart", verifyToken, updateCart);

export default router;