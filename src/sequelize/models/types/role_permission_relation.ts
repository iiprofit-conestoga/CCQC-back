import { Model, BuildOptions } from "sequelize"

interface Attributes {
    id?: number;
    role_id?: number;
    permission_id?: number;
    createdAt?: Date;
    modifiedAt?: Date;
    createdBy?: number;
    modifiedBy?: number;
}

interface CustomModel extends Model<Attributes>, Attributes {}


type ModelTypes = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): CustomModel
}

export { ModelTypes as RolePermissionRelationModel , Attributes as RolePermissionRelationAttributes }