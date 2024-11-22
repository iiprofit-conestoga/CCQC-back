import { Model, BuildOptions } from "sequelize";

interface BrandMasterAttributes {
    id?: number;
    brandName: string;
    description: string;
    isActive: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
    createdBy?: number;
    modifiedBy?: number;
}

interface BrandMasterModel extends Model<BrandMasterAttributes>, BrandMasterAttributes {}

type BrandMasterModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): BrandMasterModel;
};

export { BrandMasterModelStatic as BrandMasterModel, BrandMasterAttributes };
