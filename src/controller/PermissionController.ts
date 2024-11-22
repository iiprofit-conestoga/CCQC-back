import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const PermissionsModel = ProjectDB.PermissionMaster; // Sequelize model

const permissionController = new GenericController(PermissionsModel);

export default {
    create: permissionController.create.bind(permissionController),
    update: permissionController.update.bind(permissionController),
    findSingle: permissionController.getSingle.bind(permissionController),
    findAll: permissionController.getAll.bind(permissionController),
    deleteSingle: permissionController.delete.bind(permissionController)
};
