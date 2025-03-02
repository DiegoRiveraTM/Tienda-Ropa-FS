import { Response } from "express";
import User from "../models/Users";
import { AuthRequest } from "../middleware/auth";

// Obtener el carrito del usuario
export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).select("cart");

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json({ cart: user.cart });
  } catch (error: any) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// Agregar un producto al carrito
export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      res.status(400).json({ message: "Producto y cantidad son obligatorios" });
      return;
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = user.cart.find((item) => item.productId.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity; // Si ya está en el carrito, solo aumenta la cantidad
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Producto agregado al carrito", cart: user.cart });
  } catch (error: any) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// Eliminar un producto del carrito
export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    user.cart = user.cart.filter((item) => item.productId.toString() !== id);
    await user.save();

    res.status(200).json({ message: "Producto eliminado del carrito", cart: user.cart });
  } catch (error: any) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// Actualizar el carrito completo
export const updateCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      res.status(400).json({ message: "El carrito debe ser un array de productos" });
      return;
    }

    user.cart = products;
    await user.save();

    res.status(200).json({ message: "Carrito actualizado", cart: user.cart });
  } catch (error: any) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};