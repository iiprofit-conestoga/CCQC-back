/**
 * This is the Router Index file.
 * Because of this file we dont need to import specific Route file at specific page we just need to import this file and
 * we can access all the Routes.
 * All routes object will import here and we will export them as single object so we can use them  easily in the application
 *
 */

// Import express module which is used for Routes creation
import { Router, Request, Response } from "express";
//Create Router object using express router method
const AuthorizedRoute = Router();
const unAuthorizedRoute = Router();

/**
 * Import Custom Modules
 * @httpStatus This module contain all type of http status code which we can use in this page
 * @RoleRouter This module contains all the role specific routes
 */
import { RoleRouter } from "./Roles/RoleRouter";
import { UserProfileRouter } from "./Users/UserProfileRouter";
import { AuthRouter } from "./Auth/AuthRouter";
import { RefreshRouter } from "./Auth/RefreshTokenRouter";
import { PermissionRouter } from "./Permissions/PermissionRouter";
import { RolePermissionRelationRouter } from "./RolePermissionsRelation/RolePermissionRelationRouter";
import { BrandRouter } from "./Brands/BrandsRouter";
import { PartsRouter } from "./Parts/PartsRouter";
import { CarModelRouter } from "./CarModel/CarModelRouter";
import { CustomerRouter } from "./Customer/CustomerRouter"
import { CarServiceRouter } from "./CarService/CarServiceRouter";
import { CarServiceTaskRouter } from "./CarServiceTask/CarServiceTaskRouter"

import httpStatus from "../helper/http_status";

// Add the Routes into the application
AuthorizedRoute.use(RoleRouter);
AuthorizedRoute.use(UserProfileRouter);
AuthorizedRoute.use(PermissionRouter);
AuthorizedRoute.use(RolePermissionRelationRouter);
AuthorizedRoute.use(BrandRouter);
AuthorizedRoute.use(PartsRouter);
AuthorizedRoute.use(CarModelRouter);
AuthorizedRoute.use(CustomerRouter);
AuthorizedRoute.use(CarServiceRouter);
AuthorizedRoute.use(CarServiceTaskRouter);


// Bad Request
// If any request comes which is not defined in our system then that request will server as bad request and following code will be execute
AuthorizedRoute.all("*", (req: Request, res: Response) => {
  res.status(httpStatus.BAD_REQUEST).json({
    code: httpStatus.BAD_REQUEST,
    message: "Bad Request - Url not found",
  });
});

// Unauthorized Routes
unAuthorizedRoute.use(RefreshRouter);
unAuthorizedRoute.use(AuthRouter);

// Export entire router object so we can use this in the application
export { AuthorizedRoute as routerV1, unAuthorizedRoute as routerV2 };
