import { DataTypes, Sequelize } from "sequelize";
import { RolePermissionRelationModel } from "./types"; // Adjust the path as needed

export const RolePermissionRelationFactory = (orm: Sequelize): RolePermissionRelationModel => {
    return <RolePermissionRelationModel>orm.define(
        "role_permission_relation", // Table name in the database
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true, // Adjusted to true to allow for optional id
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: true, // Optional foreign key
                references: {
                    model: "role_master",
                    key: "id",
                },
            },
            permission_id: {
                type: DataTypes.INTEGER,
                allowNull: true, // Optional foreign key
                references: {
                    model: "permission_master",
                    key: "id",
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true, // Adjust as needed based on your use case
            },
            modifiedAt: {
                type: DataTypes.DATE,
                allowNull: true, // Adjust as needed based on your use case
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: true, // Optional foreign key
                references: {
                    model: "user_profile",
                    key: "id",
                },
            },
            modifiedBy: {
                type: DataTypes.INTEGER,
                allowNull: true, // Optional foreign key
                references: {
                    model: "user_profile",
                    key: "id",
                },
            },
        },
        {
            timestamps: true,
            createdAt: "createdAt",
            updatedAt: "modifiedAt",
            deletedAt: false, // This can be adjusted if soft deletes are desired
            schema: "ccqc",
        }
    );
};
