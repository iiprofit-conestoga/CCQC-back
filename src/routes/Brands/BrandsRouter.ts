import express from 'express';
import { BrandController} from '../../controller/Index'; // Adjust the import path as necessary
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"

const BrandRouter = express.Router();

// Route to create a role
BrandRouter.post('/brand',checkPermission(PermissionsList.Add_Single_Brand),
  BrandController.create
);

// Route to get all roles
BrandRouter.get('/brand',checkPermission(PermissionsList.Read_All_Brand),BrandController.findAll);

// Route to get a single role by ID
BrandRouter.get('/brand/:id',checkPermission(PermissionsList.Read_Single_Brand), BrandController.findSingle);

// Route to update a role by ID
BrandRouter.put('/brand/:id',checkPermission(PermissionsList.Edit_Single_Brand),BrandController.update);

// Route to delete a role by ID
BrandRouter.delete('/brand/:id',checkPermission(PermissionsList.Delete_Single_Brand),BrandController.deleteSingle);


export { BrandRouter }
