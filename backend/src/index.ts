import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import cartRoutes from "./routes/cartRoutes"; // Asegúrate de que este archivo exista y esté correctamente nombrado
import coinbaseRoutes from "./routes/coinbase";
import webhookRoutes from "./routes/webhooks";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import catalogRoutes from "./routes/catalog";

dotenv.config();

const app = express();

// 📌 Conectar a MongoDB
connectDB();

// 📌 Configurar CORS correctamente
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://fef1-2806-230-4043-c3d8-2dfb-a2be-374e-a05e.ngrok-free.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"],
  credentials: true,
}));

// 📌 Middlewares globales
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 📌 Middleware para procesar webhooks de Coinbase en formato raw
app.use("/api/coinbase/webhook", bodyParser.raw({ type: "application/json" }));

// 📌 Importar rutas de Webhooks
app.use("/api/coinbase/webhook", webhookRoutes);

// 📌 Configuración de sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// 📌 Ruta principal
app.get("/", (req, res) => {
  res.send("✅ Servidor funcionando correctamente.");
});

// 📌 Webhooks de Coinbase (fuera de /api)
app.post("/webhook/coinbase", (req, res) => {
  console.log("📩 Webhook recibido de Coinbase:", req.body);
  res.sendStatus(200); // Confirmar recepción del webhook
});

// 📌 Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api", cartRoutes); // Asegúrate de que esta ruta esté configurada correctamente
app.use("/api/coinbase", coinbaseRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/catalog", catalogRoutes);

// 📌 Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});