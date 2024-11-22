import express from 'express';
import { PermissionController } from '../../controller/Index'; // Adjust the import path as necessary
// import permissionSchema from "./PermissionValidation"
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"

const PermissionRouter = express.Router();

// Route to create a permission
PermissionRouter.post('/permission',checkPermission(PermissionsList.Add_Permission),
  PermissionController.create
);

// Route to get all permissions
PermissionRouter.get('/permission',checkPermission(PermissionsList.Read_All_Permission),PermissionController.findAll);

// Route to get a single permission by ID
PermissionRouter.get('/permission/:id',checkPermission(PermissionsList.Read_Single_Permission), PermissionController.findSingle);

// Route to update a permission by ID
PermissionRouter.put('/permission/:id',checkPermission(PermissionsList.Edit_Single_Permission),
  PermissionController.update
);

// Route to delete a permission by ID
PermissionRouter.delete('/permission/:id',checkPermission(PermissionsList.Delete_Permission), PermissionController.deleteSingle);


export { PermissionRouter }
