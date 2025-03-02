import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  category: "hombres" | "mujeres" | "ninos";
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ["hombres", "mujeres", "ninos"], required: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
