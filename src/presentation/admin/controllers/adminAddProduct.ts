import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Product } from "@/infrastructure/database/models/productSchema";
import { uploadProductFileToS3 } from "@/utilities/aws/ProductS3";

export const adminAddProductController = (dependencies: IAdminDependencies) => {
   
    
    return async (req: Request, res: Response, next: NextFunction): Promise<void |null | any> => {
        try {
            console.log("Received request body for adding product:", req.body ,  "rik rik rik ", req.file);
    
            const { name, nameAr, description, descriptionAr, price, unit, stock, isAvailable } = req.body;


               // ✅ Step 3: Convert name to lowercase for case-insensitive comparison
               const lowerCaseName = name.toLowerCase();

               // ✅ Step 4: Check if a product with the same name exists (case-insensitive)
               const existingProduct = await Product.findOne({ name: new RegExp(`^${lowerCaseName}$`, "i") });
               if (existingProduct) {
                   return res.status(400).json({ success: false, message: "Product with this name already exists" });
               }

            // ✅ Step 1: Validate required fields
            if (!name || !nameAr || !price || stock === undefined || isAvailable === undefined) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            // ✅ Step 2: Handle Image Uploads (Ensure at least one image is uploaded)
            if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                return res.status(400).json({ success: false, message: "At least one image is required!" });
            }

             
    

            const files = req.files as Express.Multer.File[];
            const imageUrls = await Promise.all(
                files.map(async (file) => {
                    const fileUrl = await uploadProductFileToS3(file.buffer, file.originalname);
                    return fileUrl;
                })
            );

        
            // ✅ Step 5: Save the product to the database
            const newProduct = new Product({
                name,
                nameAr,
                description,
                descriptionAr,
                price,
                unit,
                stock,
                isAvailable,
                images: imageUrls, // Store S3 image URLs
            });

            await newProduct.save();

            return res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });

        } catch (error) {
            console.error("Error while adding product:", error);
            next(error);
        }
    };
};
