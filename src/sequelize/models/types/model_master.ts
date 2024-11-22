import { Model, BuildOptions } from "sequelize";

interface ModelMasterAttributes {
    id?: number;
    modelName: string;
    description: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    modifiedBy?: number;
    brandMasterId?: number;
}

interface ModelMasterModel extends Model<ModelMasterAttributes>, ModelMasterAttributes {}

type ModelMasterModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): ModelMasterModel;
};

export { ModelMasterModelStatic as ModelMasterModel, ModelMasterAttributes };
