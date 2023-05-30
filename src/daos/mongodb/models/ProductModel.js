import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, require: false },
  code: { type: String, required: true},
  stock: { type: Number, required: true },
  status: { type: Boolean, required: true },
  category: { type: String, required: true }
});

export const ProductsModel = mongoose.model("products", productsSchema);
