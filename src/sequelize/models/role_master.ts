import { DataTypes, Sequelize } from "sequelize";
import { roleMasterModel } from "./types"; // Adjust the path as needed

export const RoleMasterFactory = (orm: Sequelize): roleMasterModel => {
    return <roleMasterModel>orm.define(
        "role_master", // Table name in the database
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true, // Adjusted to true to allow for optional id
            },
            roleName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(255), // Adjusted length as needed for description
                allowNull: false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
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
            schema: "ccqc"
        }
    );
};
