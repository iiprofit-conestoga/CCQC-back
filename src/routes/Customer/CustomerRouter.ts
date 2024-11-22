import express from 'express';
import { CustomerController} from '../../controller/Index'; // Adjust the import path as necessary
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"
const CustomerRouter = express.Router();

// Route to create a role
CustomerRouter.post('/customer',checkPermission(PermissionsList.Add_Single_Customer),
  CustomerController.create
);

// Route to get all roles
CustomerRouter.get('/customer',checkPermission(PermissionsList.Read_All_Customer),CustomerController.findAll);

// Route to get a single role by ID
CustomerRouter.get('/customer/:id',checkPermission(PermissionsList.Read_Single_Customer), CustomerController.findSingle);

// Route to update a role by ID
CustomerRouter.put('/customer/:id',checkPermission(PermissionsList.Edit_Single_Customer),CustomerController.update);

// Route to delete a role by ID
CustomerRouter.delete('/customer/:id',checkPermission(PermissionsList.Delete_Single_Customer),CustomerController.deleteSingle);


export { CustomerRouter }
