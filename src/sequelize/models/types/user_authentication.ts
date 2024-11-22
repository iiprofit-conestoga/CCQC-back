import { Model, BuildOptions } from "sequelize";

interface Attributes {
  id?: number;
  userinfo?: number;
  username: string;
  email: string;
  passwordHash?: string;
  role_id?: number;
  refreshToken?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordTokenExp?: Date | null;
  createdAt?: Date;
  modifiedAt?: Date;
  createdBy?: number;
  modifiedBy?: number;
}

interface CustomModel extends Model<Attributes>, Attributes {}

type ModelTypes = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): CustomModel;
};

export {
  ModelTypes as UserAuthenticationnModel,
  Attributes as UserAuthenticationAttributes,
};
