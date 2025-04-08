import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import { Router } from 'express';
import upload from '@/utilities/multer/multer';


export const adminRoutes = (dependencies: IAdminDependencies) => {
    const { loginAdmin,adminAddProduct,adminGetProduct,adminGetProductById,adminDeleteProductById,adminUpdateProductById } = adminController(dependencies);
    const router = Router();
    router.route("/login").post(loginAdmin); // No need to change this line.
    router.route("/addProduct").post(upload.array("images", 5), adminAddProduct); 
    router.route("/getProduct").get(adminGetProduct)
    router.route("/getProductById/:id").get(adminGetProductById)
    router.route("/deleteProductById/:id").get(adminDeleteProductById)
    router.route("/updateProductById").post(upload.array("images", 5),adminUpdateProductById)
    return router;
};
