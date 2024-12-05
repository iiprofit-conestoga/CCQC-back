
import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const carModelModel = ProjectDB.ModelMaster; // Sequelize model

const carModelController = new GenericController(carModelModel);

export default {
    create: carModelController.create.bind(carModelController),
    update: carModelController.update.bind(carModelController),
    findSingle: carModelController.getSingle.bind(carModelController),
    findAll: carModelController.getAll.bind(carModelController),
    deleteSingle: carModelController.delete.bind(carModelController)
};
