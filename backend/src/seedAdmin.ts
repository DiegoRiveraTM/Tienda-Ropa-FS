import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/Users"; // Asegúrate de que la ruta sea correcta

dotenv.config();

const adminData = {
  name: "Admin",
  email: "admin@admin.com",
  password: "adminpassword", // La contraseña en texto plano (se cifrará)
  role: "admin"
};

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ Conectado a MongoDB");

    // Busca si ya existe un usuario admin
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("✅ El usuario admin ya existe.");
    } else {
      // Cifrar la contraseña
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

      // Crear el usuario admin
      const adminUser = new User({
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword,
        role: adminData.role,
      });

      await adminUser.save();
      console.log("✅ Usuario admin creado exitosamente.");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error al crear el usuario admin:", error);
    mongoose.connection.close();
  }
}

seedAdmin();
