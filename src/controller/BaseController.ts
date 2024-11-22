import { Request, Response, NextFunction } from "express";
import { Model, FindOptions, UpdateOptions } from "sequelize";
import { validationResult } from "express-validator";
import Logging from "../middleware/Logging";
import { httpStatus, getHandlerResponseObject } from "../helper/Index";

// Helper for handling Sequelize models with types
export class GenericController<T extends Model> {
    constructor(private model: { new (): T } & typeof Model) {}

    // Create a new record
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.BAD_REQUEST,
                    "Validation error",
                    errors.array()
                );
                return res.status(code).json({ code, data, message });
            }

            const newItem = await this.model.create({ ...req.body });

            const { code, data, message } = getHandlerResponseObject(
                true,
                httpStatus.OK,
                "Item added successfully",
                newItem
            );
            return res.status(code).json({ code, data, message });
        } catch (error) {
            Logging.error(error);
            next(error);
        }
    }

    // Get all records, with optional pagination
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const pageNumber = parseInt(req.query.pageNumber as string) || 1;
            const showAll = req.query.showAll === "true";
            
            // Conditional query based on 'isActive' field and 'showAll' query parameter
            const query: FindOptions = {
                where: !showAll && this.model.hasOwnProperty("isActive") ? { isActive: true } : {},
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
            };

            const items = await this.model.findAll(query);

            if (!items.length) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.NOT_FOUND,
                    "Items not found"
                );
                return res.status(code).json({ code, data, message });
            }

            const { code, data, message } = getHandlerResponseObject(
                true,
                httpStatus.OK,
                "Items fetched successfully",
                items
            );
            return res.status(code).json({ code, data, message });
        } catch (error) {
            Logging.error(error);
            next(error);
        }
    }

    // Get a single record by ID
    async getSingle(req: Request, res: Response, next: NextFunction) {
        try {
            const itemId = req.params.id;
            const item = await this.model.findByPk(itemId);

            if (!item) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.NOT_FOUND,
                    "Item not found"
                );
                return res.status(code).json({ code, data, message });
            }

            const { code, data, message } = getHandlerResponseObject(
                true,
                httpStatus.OK,
                "Item fetched successfully",
                item
            );
            return res.status(code).json({ code, data, message });
        } catch (error) {
            Logging.error(error);
            next(error);
        }
    }

    // Update a record by ID
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const itemId = req.params.id;
            const updateData = req.body;

            const item = await this.model.update(updateData, {
                where: { id: itemId } as any,
                returning: true,
                validate: false,
                fields: Object.keys(updateData) as any,
            });

            if (!item) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.NOT_FOUND,
                    "Item not found"
                );
                return res.status(code).json({ code, data, message });
            }

            const { code, data, message } = getHandlerResponseObject(
                true,
                httpStatus.OK,
                "Item updated successfully",
                item
            );
            return res.status(code).json({ code, data, message });
        } catch (error) {
            Logging.error(error);
            next(error);
        }
    }

    // Delete a record by ID
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const itemId = req.params.id;
            const deleteCount = await this.model.destroy({
                where: { id: itemId } as any,
            });

            if (deleteCount === 0) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.NOT_FOUND,
                    "Item not found"
                );
                return res.status(code).json({ code, data, message });
            }

            const { code, data, message } = getHandlerResponseObject(
                true,
                httpStatus.OK,
                "Item deleted successfully"
            );
            return res.status(code).json({ code, data, message });
        } catch (error) {
            Logging.error(error);
            next(error);
        }
    }
}
