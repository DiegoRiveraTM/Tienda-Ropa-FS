import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Usuario dueño del carrito
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 },
    }
  ],
  total: { type: Number, required: true, default: 0 }, // Total del carrito
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
