import express from 'express';
import { CarServiceController} from '../../controller/Index'; // Adjust the import path as necessary
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"
const CarServiceRouter = express.Router();

// Route to create a role
CarServiceRouter.post('/car-service',
  CarServiceController.create
);

// Route to get all roles
CarServiceRouter.get('/car-service',checkPermission(PermissionsList.Read_All_Service), CarServiceController.findAll);

// Route to get a single role by ID
CarServiceRouter.get('/car-service/:id',checkPermission(PermissionsList.Read_Single_Service),CarServiceController.findSingle);

// Route to update a role by ID
CarServiceRouter.put('/car-service/:id',checkPermission(PermissionsList.Edit_Single_Service),CarServiceController.update);

// Route to delete a role by ID
CarServiceRouter.delete('/car-service/:id',checkPermission(PermissionsList.Delete_Single_Service), CarServiceController.deleteSingle);


export { CarServiceRouter }
