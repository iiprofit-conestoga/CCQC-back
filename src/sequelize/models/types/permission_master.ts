import { Model, BuildOptions } from "sequelize"

interface Attributes {
    id?: number
    permissionName: string
    description: string
    isActive: boolean
    createdAt?: Date
    modifiedAt?: Date
    sectionName: string
    createdBy?: number
    modifiedBy?: number
    
}

interface CustomModel extends Model<Attributes>, Attributes {}


type ModelTypes = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): CustomModel
}

export { ModelTypes as PermissionMasterModel , Attributes as PermissionMasterAttributes }