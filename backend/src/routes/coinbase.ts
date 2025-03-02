import express from "express";
import { createCharge } from "../controllers/coinbaseController";

const router = express.Router();

router.post("/create-charge", async (req, res, next) => {
    try {
      await createCharge(req, res);
    } catch (error) {
      console.error("❌ Error en la ruta /create-charge:", error);
      res.status(500).json({ message: "❌ Error interno del servidor" });
    }
  });
  

export default router;
