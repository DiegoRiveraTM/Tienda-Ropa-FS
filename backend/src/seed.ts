import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product"; // Asegúrate de que esté en minúsculas

// Configura las variables de entorno
dotenv.config();

// Conecta a MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar MongoDB:", err));

// Datos de los productos (ajustados al esquema)
const products = [
  { name: "Chaqueta de Cuero", price: 1299, image: "URL_IMAGEN", category: "hombres" },
  { name: "Vestido de Noche", price: 899, image: "URL_IMAGEN", category: "mujeres" },
  { name: "Conjunto Escolar", price: 299, image: "URL_IMAGEN", category: "ninos" }
];

// Función para insertar los productos
async function seedProducts() {
  try {
    // Elimina todos los productos existentes (opcional)
    await Product.deleteMany({});
    console.log("✅ Productos existentes eliminados.");

    // Inserta los nuevos productos
    await Product.insertMany(products);
    console.log("✅ Productos añadidos correctamente.");
  } catch (err) {
    console.error("❌ Error al añadir productos:", err);
  } finally {
    // Cierra la conexión a MongoDB
    mongoose.connection.close();
    console.log("✅ Conexión a MongoDB cerrada.");
  }
}

// Ejecuta la función de seeding
seedProducts();