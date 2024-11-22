
import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const CustomerModel = ProjectDB.CustomerMaster; // Sequelize model

const customerController = new GenericController(CustomerModel);

export default {
    create: customerController.create.bind(customerController),
    update: customerController.update.bind(customerController),
    findSingle: customerController.getSingle.bind(customerController),
    findAll: customerController.getAll.bind(customerController),
    deleteSingle: customerController.delete.bind(customerController)
};
