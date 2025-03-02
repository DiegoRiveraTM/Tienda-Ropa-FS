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
    const { productId, name, price, image, quantity } = req.body;

    if (!productId || !name || !price || !image || !quantity) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const existingProduct = user.cart.find((item) => item.productId === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      user.cart.push({ productId, name, price, image, quantity });
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

    user.cart = user.cart.filter((item) => item.productId !== id);
    await user.save();

    res.status(200).json({ message: "Producto eliminado del carrito", cart: user.cart });
  } catch (error: any) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const { productId, quantity } = req.body;

    if (!productId || typeof quantity !== "number") {
      res.status(400).json({ message: "Producto o cantidad no válidos" });
      return;
    }

    const product = user.cart.find((item) => item.productId === productId);
    if (product) {
      product.quantity = quantity;
      await user.save();
      res.status(200).json({ message: "Cantidad actualizada", cart: user.cart });
    } else {
      res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};