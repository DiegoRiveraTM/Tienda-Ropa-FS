import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/orders";
import User from "../models/Users";

dotenv.config();

const router = express.Router();

// Middleware para obtener el `rawBody`
router.use((req, res, next) => {
    express.raw({ type: "application/json" })(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "❌ Error en el middleware raw" });
        }
        next();
    });
});
router.use('/api/coinbase/webhook', express.raw({ type: 'application/json' }));

// ✅ Ruta para recibir los webhooks de Coinbase
router.post("/", async (req, res) => {
    const signature = req.headers["x-cc-webhook-signature"];

    if (!signature) {
        console.error("❌ Firma del webhook faltante");
        res.status(400).json({ message: "❌ Firma de webhook faltante" });
        return;
    }

    try {
        // ✅ Obtener `rawBody` correctamente
        const rawBody = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body);
        console.log("📩 Webhook recibido (RAW):", rawBody);

        // Generar firma HMAC para validación
        const hmac = crypto.createHmac("sha256", process.env.COINBASE_WEBHOOK_SECRET!);
        hmac.update(rawBody);
        const expectedSignature = hmac.digest("hex");

        // Verificar si la firma coincide
        if (signature !== expectedSignature) {
            console.error("❌ Firma del webhook incorrecta");
            res.status(400).json({ message: "❌ Firma de webhook no válida" });
            return;
        }

        // ✅ Parsear el cuerpo del webhook
        const event = JSON.parse(rawBody);
        console.log("📩 Evento recibido:", event);

        // ✅ Verificar si el pago fue exitoso
        if (event.type === "charge:confirmed") {
            console.log("✅ Pago confirmado, creando orden...");

            const chargeData = event.data;
            const userEmail = chargeData.metadata?.userEmail || "sin-email";
            const amountPaid = chargeData.pricing.local.amount;
            const currency = chargeData.pricing.local.currency;
            
            // ✅ Buscar al usuario en la base de datos por email (debes enviar `userEmail` en el metadata del pago)
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                console.error("❌ Usuario no encontrado para crear orden.");
                res.status(400).json({ message: "❌ Usuario no encontrado" });
                return;
            }

            // ✅ Crear nueva orden
            const newOrder = new Order({
                user: user._id,
                products: [], // Aquí podrías agregar los productos comprados
                total: amountPaid,
                currency: currency,
                status: "pagado",
            });

            await newOrder.save();
            console.log("✅ Orden creada exitosamente:", newOrder);

            res.status(200).json({ message: "✅ Orden creada exitosamente" });
            return;
        }

        console.log("ℹ️ Evento no relevante, ignorado.");
        res.sendStatus(200);
    } catch (error) {
        console.error("❌ Error al procesar el webhook:", error);
        res.status(500).json({ message: "❌ Error interno del servidor" });
    }
});

export default router;
