import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const RolePermissionsRelationModel = ProjectDB.RolePermissionRelation; // Sequelize model

const rolePermissionRelationController = new GenericController(RolePermissionsRelationModel);

export default {
    create: rolePermissionRelationController.create.bind(rolePermissionRelationController),
    update: rolePermissionRelationController.update.bind(rolePermissionRelationController),
    findSingle: rolePermissionRelationController.getSingle.bind(rolePermissionRelationController),
    findAll: rolePermissionRelationController.getAll.bind(rolePermissionRelationController),
    deleteSingle: rolePermissionRelationController.delete.bind(rolePermissionRelationController)
};