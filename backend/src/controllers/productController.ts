import express, { Request, Response } from "express";
import mongoose, { Types } from "mongoose"; // ✅ Importa Types para manejar ObjectId
import Product from "../models/Product";
import { AuthRequest, isAdmin, verifyToken } from "../middleware/auth";

const router: express.Router = express.Router();

// ✅ Obtener todos los productos
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();

    // 🔥 Convertir `_id` a string antes de enviarlo al frontend
    const formattedProducts = products.map(product => ({
      ...product.toObject(),
      _id: product._id.toString(),
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "❌ Error fetching products" });
  }
});

// ✅ Obtener un solo producto por ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // ✅ Validar si el ID es un ObjectId válido
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "❌ ID inválido" });
      return;
    }

    const product = await Product.findById(new Types.ObjectId(id));

    if (!product) {
      res.status(404).json({ message: "❌ Product not found" });
      return;
    }

    res.status(200).json({ ...product.toObject(), _id: product._id.toString() });
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ message: "❌ Error fetching product" });
  }
});

// ✅ Crear un nuevo producto (solo admin)
router.post("/", verifyToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "✅ Product successfully created", product: newProduct });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "❌ Error creating product" });
  }
});

// ✅ Eliminar un producto por ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // ✅ Validar si el ID es un ObjectId válido
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "❌ ID inválido" });
      return;
    }

    const deletedProduct = await Product.findByIdAndDelete(new Types.ObjectId(id));

    if (!deletedProduct) {
      res.status(404).json({ message: "❌ Producto no encontrado" });
    }

    res.status(200).json({ message: "✅ Product deleted", product: deletedProduct });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "❌ Error deleting product" });
  }
});

// ✅ Actualizar stock de un producto (solo admin)
router.put("/update-stock/:id", verifyToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    // ✅ Validar si el ID es un ObjectId válido
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "❌ ID inválido" });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      new Types.ObjectId(id),
      { stock },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "❌ Producto no encontrado" });
      return;
    }

    res.status(200).json({ message: "✅ Stock actualizado", product: updatedProduct });
  } catch (error) {
    console.error("❌ Error al actualizar el stock:", error);
    res.status(500).json({ message: "❌ Error al actualizar el stock" });
  }
});

export default router;
