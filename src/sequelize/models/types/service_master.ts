import { Model, BuildOptions } from "sequelize";

interface ServiceMasterAttributes {
    id?: number;
    vinNumber: string;
    remarks: string;
    customerId: number;
    brandMasterId: number;
    modelMasterId: number;
    mechanicName: string;
    serviceType: string;
    serviceDate: Date;
    modelYear: string;
    servicePrice: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    modifiedBy?: number;
}

interface ServiceMasterModel extends Model<ServiceMasterAttributes>, ServiceMasterAttributes {}

type ServiceMasterModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): ServiceMasterModel;
};

export { ServiceMasterModelStatic as ServiceMasterModel, ServiceMasterAttributes };
