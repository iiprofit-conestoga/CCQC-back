import { Model, BuildOptions } from "sequelize";

interface ServiceTaskAttributes {
    id?: number;
    taskType: string;
    description: string;
    taskName:string;
    partId: number;
    serviceId: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    modifiedBy?: number;
}

interface ServiceTaskModel extends Model<ServiceTaskAttributes>, ServiceTaskAttributes {}

type ServiceTaskModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): ServiceTaskModel;
};

export { ServiceTaskModelStatic as ServiceTaskModel, ServiceTaskAttributes };
