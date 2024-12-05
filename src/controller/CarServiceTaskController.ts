
import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const CarServiceTaskModel = ProjectDB.ServiceTasks; // Sequelize model

const carServiceTaskController = new GenericController(CarServiceTaskModel);

export default {
    create: carServiceTaskController.create.bind(carServiceTaskController),
    update: carServiceTaskController.update.bind(carServiceTaskController),
    findSingle: carServiceTaskController.getSingle.bind(carServiceTaskController),
    findAll: carServiceTaskController.getAll.bind(carServiceTaskController),
    deleteSingle: carServiceTaskController.delete.bind(carServiceTaskController)
};
