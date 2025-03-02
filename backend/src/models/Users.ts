import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product"; // Asegúrate de importar la interfaz del modelo Product si la tienes

// Definir la interfaz para los ítems del carrito
export interface ICartItem {
  productId: mongoose.Schema.Types.ObjectId | IProduct; // Permitir el `ObjectId` o el objeto poblado
  quantity: number;
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
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
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
