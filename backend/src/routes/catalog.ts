import { Router } from "express";
import getAllProducts from "../controllers/productController";
import getProductsByCategory from "../controllers/productController";
import getProductById from "../controllers/productController";

const router = Router();

router.get("/", getAllProducts); // Obtener todos los productos
router.get("/category/:category", getProductsByCategory); // Obtener productos por categoría
router.get("/id/:id", getProductById); // Obtener un producto por ID

export default router;
