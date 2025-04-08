import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Product } from "@/infrastructure/database/models/productSchema";
import { uploadProductFileToS3 } from "@/utilities/aws/ProductS3";

export const adminUpdateProductByIdController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      console.log("Received update request:", req.body, "Files:", req.files);

      const { _id, name, nameAr, description, descriptionAr, price, unit, stock, isAvailable } = req.body;

      // ✅ Step 1: Validate request parameters
      if (!_id) {
        return res.status(400).json({ success: false, message: "Product ID is required!" });
      }

      const product = await Product.findById(_id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found!" });
      }

      // ✅ Step 2: Handle new images (if uploaded)
      let imageUrls: string[] = product.images; // Retain existing images

      if (req.files && (req.files as Express.Multer.File[]).length > 0) {
        const files = req.files as Express.Multer.File[];
        const uploadedImages = await Promise.all(
          files.map(async (file) => {
            return await uploadProductFileToS3(file.buffer, file.originalname);
          })
        );
        imageUrls = [...imageUrls, ...uploadedImages]; // Append new images
      }

      // ✅ Step 3: Prepare updated fields
      const updatedFields: Partial<typeof product> = {
        ...(name && { name }),
        ...(nameAr && { nameAr }),
        ...(description && { description }),
        ...(descriptionAr && { descriptionAr }),
        ...(price && { price }),
        ...(unit && { unit }),
        ...(stock !== undefined && { stock }),
        ...(isAvailable !== undefined && { isAvailable }),
        ...(req.files && { images: imageUrls }), // Only update images if new ones exist
      };

      // ✅ Step 4: Update the product
      const updatedProduct = await Product.findByIdAndUpdate(_id, updatedFields, { new: true });

      return res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        product: updatedProduct,
      });

    } catch (error) {
      console.error("Error updating product:", error);
      next(error);
    }
  };
};
