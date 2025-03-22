import { ProductEntity } from "@/domain/entities";
import { model, Schema } from "mongoose";

const ProductSchema = new Schema<ProductEntity>(
  {
    name: { type: String, required: true }, // Product name
    nameAr: { type: String, required: true }, // Arabic product name
    description: { type: String }, // Optional product description
    descriptionAr: { type: String }, // Optional Arabic product description
    price: { type: Number, required: true }, // Price per unit
    unit: { type: String, required: true, enum: ["kg", "g", "pack", "litre"] }, // Unit of measurement
    stock: { type: Number, default: 0 }, // Available stock
    isAvailable: { type: Boolean, default: true }, // Availability status
    images: [{ type: String, default: [] }], // Optional array of image URLs
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Product = model<ProductEntity>("Product", ProductSchema);
