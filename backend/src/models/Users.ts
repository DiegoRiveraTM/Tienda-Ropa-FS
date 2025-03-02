import mongoose, { Document, Schema } from "mongoose";

// Definir la interfaz para los ítems del carrito
export interface ICartItem {
  productId: string; // ID del producto como String
  name: string;      // Nombre del producto
  price: number;     // Precio del producto
  image: string;     // Imagen del producto
  quantity: number;  // Cantidad del producto
}

// Definir la interfaz del usuario
export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "user"; // Restringimos los valores permitidos
  cart: ICartItem[];
}

// Esquema de los ítems del carrito
const CartItemSchema: Schema = new Schema({
  productId: { type: String, required: true }, // Cambiar a String
  name: { type: String, required: true },      // Nombre del producto
  price: { type: Number, required: true },     // Precio del producto
  image: { type: String, required: true },     // Imagen del producto
  quantity: { type: Number, required: true, default: 1 }
});

// Esquema del usuario
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: { type: [CartItemSchema], default: [] }, // Relacionamos con los productos
  role: { type: String, enum: ["admin", "user"], default: "user" }
});

export default mongoose.model<IUser>("User", UserSchema);