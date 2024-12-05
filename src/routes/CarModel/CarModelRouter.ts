import express from 'express';
import { CarModelController} from '../../controller/Index'; // Adjust the import path as necessary
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"

const CarModelRouter = express.Router();

// Route to create a role
CarModelRouter.post('/car-model',checkPermission(PermissionsList.Add_Single_Model),
  CarModelController.create
);

// Route to get all roles
CarModelRouter.get('/car-model',checkPermission(PermissionsList.Read_All_Model), CarModelController.findAll);

// Route to get a single role by ID
CarModelRouter.get('/car-model/:id',checkPermission(PermissionsList.Read_Single_Model), CarModelController.findSingle);

// Route to update a role by ID
CarModelRouter.put('/car-model/:id',checkPermission(PermissionsList.Edit_Single_Model),CarModelController.update);

// Route to delete a role by ID
CarModelRouter.delete('/car-model/:id',checkPermission(PermissionsList.Delete_Single_Model), CarModelController.deleteSingle);


export { CarModelRouter }
