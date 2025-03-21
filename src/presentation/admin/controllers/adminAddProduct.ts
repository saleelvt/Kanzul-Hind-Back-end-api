import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminAddProductController = (dependencies: IAdminDependencies) => {
    const { useCases: { loginAdminUseCase } } = dependencies;
    
    return async (req: Request, res: Response, next: NextFunction): Promise<void |null | any> => {
        try {
            console.log("the req.body while add product ", req.body);
            

            return res.status(200).json({ success: true, message: "Admin " });
        } catch (error) {
            console.error("Failed to log in admin:", error);
            // Pass error to the next error handler
            next(error); 
        }
    };
};
