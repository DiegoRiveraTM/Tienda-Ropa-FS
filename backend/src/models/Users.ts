import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  productId: string;
  quantity: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string; // Add the role property
  cart: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: { type: [CartItemSchema], default: [] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export default mongoose.model<IUser>('User', UserSchema);
