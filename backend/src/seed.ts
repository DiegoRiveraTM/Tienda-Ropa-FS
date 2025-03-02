import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product"; // Asegúrate de que esté en minúsculas

dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar MongoDB:", err));

const products = [
  { name: "Chaqueta de Cuero", price: 1299, image: "URL_IMAGEN", category: "hombres", stock: 10, description: "Chaqueta de cuero premium." },
  { name: "Vestido de Noche", price: 899, image: "URL_IMAGEN", category: "mujeres", stock: 15, description: "Vestido elegante para eventos." },
  { name: "Conjunto Escolar", price: 299, image: "URL_IMAGEN", category: "ninos", stock: 20, description: "Conjunto cómodo para niños." }
];

async function seedProducts() {
  try {
    await Product.insertMany(products);
    console.log("✅ Productos añadidos correctamente.");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error al añadir productos:", err);
  }
}

seedProducts();
