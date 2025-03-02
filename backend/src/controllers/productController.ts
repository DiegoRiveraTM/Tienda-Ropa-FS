import { Request, Response } from "express";
import Product from "../models/Product"; // Importa el modelo

// Obtener todos los productos
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find(); // Busca todos los productos
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
