import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = 3000;

// Proxy que redirige todo de 3000 a 4000
app.use("/", createProxyMiddleware({ target: "http://localhost:4000", changeOrigin: true }) as any);

app.listen(PORT, () => {
  console.log(`🚀 Proxy corriendo en el puerto ${PORT}, redirigiendo a 4000`);
});
