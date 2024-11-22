import { Model, BuildOptions } from "sequelize"

interface Attributes {
    id?: number
    roleName: string
    description: string
    isActive: boolean
    createdAt?: Date
    modifiedAt?: Date
    createdBy?: number
    modifiedBy?: number
}

interface CustomModel extends Model<Attributes>, Attributes {}


type ModelTypes = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): CustomModel
}

export { ModelTypes as roleMasterModel , Attributes as roleMasterAttributes }