import { adminGetProductController } from './adminGetProuduct';
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./adminLogin";
import { adminAddProductController  } from "./adminAddProduct";


export const adminController = (dependencies: IAdminDependencies) => {
    return {
        loginAdmin: loginAdminController(dependencies), // No change needed here.
        adminAddProduct: adminAddProductController(dependencies),
        adminGetProduct:adminGetProductController(dependencies)
    };
};
