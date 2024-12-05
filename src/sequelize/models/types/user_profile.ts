import { Model, BuildOptions } from "sequelize"

interface Attributes {
    id?: number
    firstname: string;
    lastname: string;
    dob: Date;
    contactNum1: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    profilephoto: string;
    isActive: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
}

interface CustomModel extends Model<Attributes>, Attributes {}


type ModelTypes = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): CustomModel
}

export { ModelTypes as UserProfileModel , Attributes as UserProfileAttributes }