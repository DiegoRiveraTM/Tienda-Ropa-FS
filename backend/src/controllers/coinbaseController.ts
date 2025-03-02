import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

// Función para crear un cargo en Coinbase Commerce
export const createCharge = async (req: Request, res: Response) => {
  try {
    const { amount, currency, redirect_url, cancel_url } = req.body;

    // Verificar que la API Key está configurada
    const apiKey = process.env.COINBASE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "❌ Faltan credenciales: COINBASE_API_KEY no está configurado." });
    }

    // Validar que amount es un número válido mayor a 0
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ message: "❌ El monto (amount) debe ser un número válido mayor a 0." });
    }

    // Validar que currency es una cadena válida
    if (!currency || typeof currency !== "string" || currency.length !== 3) {
      return res.status(400).json({ message: "❌ Se requiere un tipo de moneda válido de 3 caracteres (ej: USD, EUR)." });
    }

    // Construcción del payload para Coinbase
    const payload = {
      name: "Compra en Mi Tienda",
      description: "Pago de un producto en la tienda",
      pricing_type: "fixed_price",
      local_price: {
        amount: amountNum.toFixed(2), // Convertir a string con 2 decimales para precisión
        currency: currency.toUpperCase() // Convertir la moneda a mayúsculas
      },
      redirect_url: redirect_url || "https://tutienda.com/success",
      cancel_url: cancel_url || "https://tutienda.com/cancel"
    };

    // Configuración de cabeceras para la API de Coinbase
    const headers = {
      "Content-Type": "application/json",
      "X-CC-Api-Key": apiKey,
      "X-CC-Version": "2018-03-22"
    };

    // Envío de solicitud a la API de Coinbase
    const response = await axios.post(
      "https://api.commerce.coinbase.com/charges",
      payload,
      { headers }
    );

    // Enviar la URL de pago generada al cliente
    res.status(200).json({
      message: "✅ Cargo creado con éxito",
      charge: response.data
    });

  } catch (error: any) {
    console.error("❌ Error al crear el cargo en Coinbase:", error.response?.data || error.message);

    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      message: "❌ Error al crear el cargo en Coinbase",
      error: error.response?.data || error.message
    });
  }
};
