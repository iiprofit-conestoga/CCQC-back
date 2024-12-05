import express from 'express';
import { CarServiceTaskController} from '../../controller/Index'; // Adjust the import path as necessary
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"

const CarServiceTaskRouter = express.Router();

// Route to create a role
CarServiceTaskRouter.post('/car-service-task',checkPermission(PermissionsList.Add_Single_SertviceTask),
  CarServiceTaskController.create
);

// Route to get all roles
CarServiceTaskRouter.get('/car-service-task',checkPermission(PermissionsList.Read_All_SertviceTask),CarServiceTaskController.findAll);

// Route to get a single role by ID
CarServiceTaskRouter.get('/car-service-task/:id',checkPermission(PermissionsList.Read_Single_Service), CarServiceTaskController.findSingle);

// Route to update a role by ID
CarServiceTaskRouter.put('/car-service-task/:id',checkPermission(PermissionsList.Edit_Single_SertviceTask),CarServiceTaskController.update);

// Route to delete a role by ID
CarServiceTaskRouter.delete('/car-service-task/:id',checkPermission(PermissionsList.Delete_Single_SertviceTask), CarServiceTaskController.deleteSingle);


export { CarServiceTaskRouter }
