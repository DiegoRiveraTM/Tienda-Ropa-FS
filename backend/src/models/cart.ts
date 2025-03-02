import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true }, // 🛒 Guardar el nombre del producto
      price: { type: Number, required: true }, // 💰 Guardar el precio
      image: { type: String, required: true }, // 🖼️ Guardar la imagen
      quantity: { type: Number, required: true, default: 1 },
    }
  ],
  total: { type: Number, required: true, default: 0 }, 
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
