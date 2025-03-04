import mongoose, { Document, Schema, Model } from "mongoose";

// 📌 Define la estructura de los productos dentro de la orden
interface IOrderProduct {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

// 📌 Define la estructura de la orden
export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: IOrderProduct[];
  total: number;
  status: "pendiente" | "pagado" | "enviado";
  createdAt: Date;
}

// 📌 Define el esquema de la orden
const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ["pendiente", "pagado", "enviado"], default: "pendiente" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // ✅ Agrega timestamps (createdAt y updatedAt automáticamente)
);

// 📌 Crea el modelo de Mongoose con el esquema
const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
