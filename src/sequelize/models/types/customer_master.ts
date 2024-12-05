import { Model, BuildOptions } from "sequelize";

interface CustomerMasterAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    contactNum1: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    createdAt?: Date;
    modifiedAt?: Date;
    isActive: boolean;
    createdBy?: number;
    modifiedBy?: number;
}

interface CustomerMasterModel extends Model<CustomerMasterAttributes>, CustomerMasterAttributes {}

type CustomerMasterModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): CustomerMasterModel;
};

export { CustomerMasterModelStatic as CustomerMasterModel, CustomerMasterAttributes };
