import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Product } from "@/infrastructure/database/models/productSchema";

export const adminDeleteProductByIdController = (
  dependencies: IAdminDependencies
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | null | any> => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(404)
          .json({ success: false, message: "Product id is missing !!" });
      }
      const products = await Product.findOne({ _id:id });
      if (!products) {
        return res
          .status(404)
          .json({ success: false, message: "The Products Not Found" });
      }
      await Product.findByIdAndDelete({ _id:id })     
      return res.status(200).json({
        success: true,
        message: "product Delted succesfully",
        data: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      next(error);
    }
  };
};
