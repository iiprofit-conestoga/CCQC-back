
import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const PartModel = ProjectDB.PartMaster; // Sequelize model

const partController = new GenericController(PartModel);

export default {
    create: partController.create.bind(partController),
    update: partController.update.bind(partController),
    findSingle: partController.getSingle.bind(partController),
    findAll: partController.getAll.bind(partController),
    deleteSingle: partController.delete.bind(partController)
};
