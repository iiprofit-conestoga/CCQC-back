import { Model, BuildOptions } from "sequelize";

interface PartMasterAttributes {
    id?: number;
    partName: string;
    description: string;
    isActive: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
    createdBy?: number;
    modifiedBy?: number;
}

interface PartMasterModel extends Model<PartMasterAttributes>, PartMasterAttributes {}

type PartMasterModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PartMasterModel;
};

export { PartMasterModelStatic as PartMasterModel, PartMasterAttributes };
