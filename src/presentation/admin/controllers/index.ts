import { adminGetProductController } from './adminGetProuduct';
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./adminLogin";
import { adminAddProductController  } from "./adminAddProduct";
import { adminGetProductByIdController } from './adminGetProductById';
import { adminDeleteProductByIdController } from './adminDeleteProductById';
import { adminUpdateProductByIdController } from './adminUpdateProductById';



export const adminController = (dependencies: IAdminDependencies) => {
    return {
        loginAdmin: loginAdminController(dependencies), // No change needed here.
        adminAddProduct: adminAddProductController(dependencies),
        adminGetProduct:adminGetProductController(dependencies),
        adminGetProductById:adminGetProductByIdController(dependencies),
        adminDeleteProductById:adminDeleteProductByIdController(dependencies),
        adminUpdateProductById:adminUpdateProductByIdController(dependencies)
    };
};
