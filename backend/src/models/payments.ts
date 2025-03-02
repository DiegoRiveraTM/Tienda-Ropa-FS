import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  chargeId: { type: String, required: true }, // ID del cargo en Coinbase
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
