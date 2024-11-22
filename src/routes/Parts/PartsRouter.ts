import express from 'express';
import { PartController} from '../../controller/Index'; // Adjust the import path as necessary
import { checkPermission } from "../../middleware/Index"
import { PermissionsList } from "../../helper/Index"

const PartsRouter = express.Router();

// Route to create a role
PartsRouter.post('/part',checkPermission(PermissionsList.Add_Single_Part),
  PartController.create
);

// Route to get all roles
PartsRouter.get('/part',checkPermission(PermissionsList.Read_All_Part), PartController.findAll);

// Route to get a single role by ID
PartsRouter.get('/part/:id',checkPermission(PermissionsList.Read_Single_Part),PartController.findSingle);

// Route to update a role by ID
PartsRouter.put('/part/:id',checkPermission(PermissionsList.Edit_Single_Part),PartController.update);

// Route to delete a role by ID
PartsRouter.delete('/part/:id',checkPermission(PermissionsList.Delete_Single_Part),PartController.deleteSingle);


export { PartsRouter }
