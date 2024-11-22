import express from 'express';
import { RoleController} from '../../controller/Index'; // Adjust the import path as necessary
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"

const RoleRouter = express.Router();

// Route to create a role
RoleRouter.post('/roles',checkPermission(PermissionsList.Add_Single_Role),
  RoleController.create
);

// Route to get all roles
RoleRouter.get('/roles',checkPermission(PermissionsList.Read_All_Role),RoleController.findAll);

// Route to get a single role by ID
RoleRouter.get('/roles/:id',checkPermission(PermissionsList.Read_Single_Role), RoleController.findSingle);

// Route to update a role by ID
RoleRouter.put('/roles/:id',checkPermission(PermissionsList.Edit_Single_Role),RoleController.update);

// Route to delete a role by ID
RoleRouter.delete('/roles/:id', checkPermission(PermissionsList.Delete_Single_Role),RoleController.deleteSingle);


export { RoleRouter }
