import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Product } from "@/infrastructure/database/models/productSchema";


export const adminGetProductController = (dependencies: IAdminDependencies) => {
   
    
    return async (req: Request, res: Response, next: NextFunction): Promise<void |null | any> => {
        try {
  
     const products= await Product.find()
     if(products.length===0){
        return res.status(400).json({success:false,message:"The Products Not Available now"})
     }
     return res.status(200).json({success:true, message:"product fetched succesfully",data:products})
           
        } catch (error) {
            console.error("Error fetching products:", error);
            next(error);
        }
    };
};
