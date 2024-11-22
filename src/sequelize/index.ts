import { Sequelize } from "sequelize";
import * as models from "./models";
import * as config from "../config/config";

// sequelize instance for customer db
const dbConfig = config.config.Development;
const orm = new Sequelize({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  dialect: "postgres",
  dialectOptions: {
    connectionTimeout: 1000,
    allowPublicKeyRetrieval: true,
  },
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

// Initialize models
const UserProfile = models.UserProfileFactory(orm);
const UserAuthentication = models.UserAuthenticationFactory(orm);
const PermissionMaster = models.PermissionMasterFactory(orm);
const RoleMaster = models.RoleMasterFactory(orm);
const RolePermissionRelation = models.RolePermissionRelationFactory(orm);
const PartMaster = models.PartMasterFactory(orm);
const ServiceTasks = models.ServiceTasksFactory(orm);
const CustomerMaster = models.CustomerMasterFactory(orm);
const ServiceMaster = models.ServiceMasterFactory(orm);
const BrandMaster = models.BrandMasterFactory(orm);
const ModelMaster = models.ModelMasterFactory(orm);


// Define relationships

// User Authentication Table Relations
UserProfile.hasMany(UserAuthentication, { foreignKey: "createdBy" });
UserAuthentication.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(UserAuthentication, { foreignKey: "modifiedBy" });
UserAuthentication.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});

UserProfile.hasMany(UserAuthentication, { foreignKey: "userinfo" });
UserAuthentication.belongsTo(UserProfile, {
  foreignKey: "userinfo",
  as: "userInfoProfile",
});

RoleMaster.hasMany(UserAuthentication, { foreignKey: "role_id" });
UserAuthentication.belongsTo(RoleMaster, {
  foreignKey: "role_id",
  as: "roleProfile",
});

// Permission Master Table Relations

UserProfile.hasMany(PermissionMaster, { foreignKey: "createdBy" });
PermissionMaster.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(PermissionMaster, { foreignKey: "modifiedBy" });
PermissionMaster.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});


// role permission relation Table 

UserProfile.hasMany(RolePermissionRelation, { foreignKey: "createdBy" });
RolePermissionRelation.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(RolePermissionRelation, { foreignKey: "modifiedBy" });
RolePermissionRelation.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});

RoleMaster.hasMany(RolePermissionRelation, { foreignKey: "role_id" });
RolePermissionRelation.belongsTo(RoleMaster, {
  foreignKey: "role_id",
  as: "roleRelationProfile",
});

PermissionMaster.hasMany(RolePermissionRelation, { foreignKey: "permission_id" });
RolePermissionRelation.belongsTo(PermissionMaster, {
  foreignKey: "permission_id",
  as: "permissionRelationProfile",
});

// Part Master Table Relations

UserProfile.hasMany(PartMaster, { foreignKey: "createdBy" });
PartMaster.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(PartMaster, { foreignKey: "modifiedBy" });
PartMaster.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});

// Service Task Table Relations


UserProfile.hasMany(ServiceTasks, { foreignKey: "createdBy" });
ServiceTasks.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(ServiceTasks, { foreignKey: "modifiedBy" });
ServiceTasks.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});

// Customer_master Table Relations


UserProfile.hasMany(CustomerMaster, { foreignKey: "createdBy" });
CustomerMaster.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(CustomerMaster, { foreignKey: "modifiedBy" });
CustomerMaster.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});

// Service master Table Relations

UserProfile.hasMany(ServiceMaster, { foreignKey: "createdBy" });
ServiceMaster.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(ServiceMaster, { foreignKey: "modifiedBy" });
ServiceMaster.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});


BrandMaster.hasMany(ServiceMaster, { foreignKey: "brandMasterId" });
ServiceMaster.belongsTo(BrandMaster, {
  foreignKey: "brandMasterId",
  as: "brandMasterIdProfile",
});


// Brand Master Table Relations

UserProfile.hasMany(BrandMaster, { foreignKey: "createdBy" });
BrandMaster.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(BrandMaster, { foreignKey: "modifiedBy" });
BrandMaster.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});

// Model Master Table Relations

UserProfile.hasMany(ModelMaster, { foreignKey: "createdBy" });
ModelMaster.belongsTo(UserProfile, {
  foreignKey: "createdBy",
  as: "createdByProfile",
});

UserProfile.hasMany(ModelMaster, { foreignKey: "modifiedBy" });
ModelMaster.belongsTo(UserProfile, {
  foreignKey: "modifiedBy",
  as: "modifiedByProfile",
});

UserProfile.hasMany(BrandMaster, { foreignKey: "brandMasterId" });
BrandMaster.belongsTo(UserProfile, {
  foreignKey: "brandMasterId",
  as: "brandMasterIdProfile",
});


const ProjectDB = {
  orm,
  UserProfile,
  UserAuthentication,
  PermissionMaster,
  RoleMaster,
  RolePermissionRelation,
  PartMaster,
  ServiceTasks,
  CustomerMaster,
  ServiceMaster, 
  BrandMaster,
  ModelMaster
};

export { ProjectDB, orm as ormProject };
