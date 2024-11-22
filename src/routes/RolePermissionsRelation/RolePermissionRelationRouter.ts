import express from 'express';
import { RolePermissionRelationController } from '../../controller/Index'; // Adjust the import path as necessary
// import permissionSchema from "./PermissionValidation"
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"

const RolePermissionRelationRouter = express.Router();

// Route to create a permission
RolePermissionRelationRouter.post('/role-permission-relation',checkPermission(PermissionsList.Add_Single_RolePermission),
  RolePermissionRelationController.create
);

// Route to get all permissions
RolePermissionRelationRouter.get('/role-permission-relation',checkPermission(PermissionsList.Read_All_RolePermission),RolePermissionRelationController.findAll);

// Route to get a single permission by ID
RolePermissionRelationRouter.get('/role-permission-relation/:id',checkPermission(PermissionsList.Read_Single_RolePermission), RolePermissionRelationController.findSingle);

// Route to update a permission by ID
RolePermissionRelationRouter.put('/role-permission-relation/:id',checkPermission(PermissionsList.Edit_Single_RolePermission),
  RolePermissionRelationController.update
);

// Route to delete a permission by ID
RolePermissionRelationRouter.delete('/role-permission-relation/:id',checkPermission(PermissionsList.Delete_Single_RolePermission), RolePermissionRelationController.deleteSingle);


export { RolePermissionRelationRouter }
