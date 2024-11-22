import express from 'express';
import { UserController  } from '../../controller/Index'; // Adjust the import path as necessary
import { httpStatus , PermissionsList } from "../../helper/Index"
import { checkPermission } from "../../middleware/Index"

const UserProfileRouter = express.Router();

// Route to create a User Profile
UserProfileRouter.post('/user-profile',checkPermission(PermissionsList.Add_Single_User) ,
    UserController.create
);

// Route to get all user-profile
UserProfileRouter.get('/user-profile', checkPermission(PermissionsList.Read_All_User) , UserController.findAll);

// Route to get a single User Profile by ID
UserProfileRouter.get('/user-profile/:id',checkPermission(PermissionsList.Read_Single_User), UserController.findSingle);

// Route to update a User Profile by ID
UserProfileRouter.put('/user-profile/:id',checkPermission(PermissionsList.Edit_Single_User) ,
    UserController.update
);

// Route to delete a User Profile by ID
UserProfileRouter.delete('/user-profile/:id',checkPermission(PermissionsList.Delete_Single_User) , UserController.deleteSingle);


export { UserProfileRouter }
