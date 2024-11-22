
import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const CarServiceModel = ProjectDB.ServiceMaster; // Sequelize model

const carServiceController = new GenericController(CarServiceModel);

export default {
    create: carServiceController.create.bind(carServiceController),
    update: carServiceController.update.bind(carServiceController),
    findSingle: carServiceController.getSingle.bind(carServiceController),
    findAll: carServiceController.getAll.bind(carServiceController),
    deleteSingle: carServiceController.delete.bind(carServiceController)
};
