
import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const RoleModel = ProjectDB.RoleMaster; // Sequelize model

const roleController = new GenericController(RoleModel);

export default {
    create: roleController.create.bind(roleController),
    update: roleController.update.bind(roleController),
    findSingle: roleController.getSingle.bind(roleController),
    findAll: roleController.getAll.bind(roleController),
    deleteSingle: roleController.delete.bind(roleController)
};
