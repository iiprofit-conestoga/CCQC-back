
import { GenericController } from './BaseController';
import { ProjectDB } from '../sequelize'; // Sequelize model

const BrandModel = ProjectDB.BrandMaster; // Sequelize model

const brandController = new GenericController(BrandModel);

export default {
    create: brandController.create.bind(brandController),
    update: brandController.update.bind(brandController),
    findSingle: brandController.getSingle.bind(brandController),
    findAll: brandController.getAll.bind(brandController),
    deleteSingle: brandController.delete.bind(brandController)
};
