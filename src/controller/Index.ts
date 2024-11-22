
/**
 * This is the Controller Index file.
 * Because of this file we dont need to import specific controller at specific page we just need to import this file and
 * we can access all the controller.
 * @EmployeeController This controller contains all the methods related to user section.
 */
import RoleController from "./RoleController";
import UserController from "./UserController";
import AuthController from "./AuthController";
import PermissionController from "./PermissionController";
import RefreshController from "./RefreshTokenController";
import RolePermissionRelationController from "./RolePermissionRelationController";
import BrandController from "./BrandController";
import PartController from "./PartController";
import CarModelController from "./ModelController";
import CustomerController from "./CustomerController";
import CarServiceController from "./CarServiceController";
import CarServiceTaskController from "./CarServiceTaskController";


// All controllers exported as single object
export { 
    RoleController, 
    UserController, 
    RefreshController,
    AuthController,
    PermissionController,
    RolePermissionRelationController,
    BrandController,
    PartController,
    CarModelController,
    CustomerController,
    CarServiceController,
    CarServiceTaskController
};
