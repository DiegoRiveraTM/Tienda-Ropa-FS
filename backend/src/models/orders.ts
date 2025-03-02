import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pendiente", "pagado", "enviado"], default: "pendiente" },
  createdAt: { type: Date, default: Date.now },
});

interface IOrderProduct {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: IOrderProduct[];
  total: number;
}

const Order = mongoose.model("Order", OrderSchema);
export default Order;
