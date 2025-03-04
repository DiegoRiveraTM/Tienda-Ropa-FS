import express, { Request, Response } from "express";
import Product from "../models/Product";
import { AuthRequest, isAdmin, verifyToken } from "../middleware/auth";

const router: express.Router = express.Router();

// Get all products
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();

    // 🔥 Asegurar que `_id` sea un string y devolver un array
    const formattedProducts = products.map((product) => ({
      ...product.toObject(),
      _id: product._id.toString(),
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "❌ Error fetching products" });
  }
});

// Get a single product by ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "❌ Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching product" });
  }
});

// Create a new product (solo admin)
router.post("/", verifyToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "✅ Product successfully created" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error creating product" });
  }
});


// Delete a product
router.delete("/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "✅ Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting product" });
  }
});

// Actualizar stock de un producto (solo admin)
router.put("/update-stock/:id", verifyToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { stock } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { stock },
        { new: true }
      );
      if (!updatedProduct) {
        res.status(404).json({ message: "❌ Producto no encontrado" });
        return;
      }
      res.status(200).json({ message: "✅ Stock actualizado", product: updatedProduct });
      return;
    } catch (error) {
      res.status(500).json({ message: "❌ Error al actualizar el stock" });
      return;
    }
  });

  // Ruta de prueba para obtener solo _id y name
  router.get("/test-products", async (req, res) => {
    try {
      console.log("📡 Conectando a MongoDB...");
      
      // Prueba si MongoDB está bien conectado
      const isConnected = await Product.db.readyState;
      console.log("🟢 Estado de conexión a MongoDB:", isConnected); 
  
      const products = await Product.find({}, { _id: 1, name: 1 });
  
      console.log("📦 Productos encontrados:", products);
      
      if (!products || products.length === 0) {
        throw new Error("No se encontraron productos en la base de datos");
      }
  
      res.json(products);
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Error al obtener productos:", error.message);
      } else {
        console.error("❌ Error al obtener productos:", error);
      }
      res.status(500).json({ message: `❌ Error fetching product: ${(error as Error).message}` });
    }
  });
  
export default router;
