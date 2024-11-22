import { DataTypes, Sequelize } from "sequelize";
import { ModelMasterModel } from "./types"; // Adjust the path as needed

export const ModelMasterFactory = (orm: Sequelize): ModelMasterModel => {
    return <ModelMasterModel>orm.define(
        "model_master", // Table name in the database
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            modelName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            modifiedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "user_profile", // References the user_profile table
                    key: "id",
                },
            },
            modifiedBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "user_profile", // References the user_profile table
                    key: "id",
                },
            },
            brandMasterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "brand_master", // References the brand_master table
                    key: "id",
                },
            },
        },
        {
            timestamps: true,
            createdAt: "createdAt",
            updatedAt: "modifiedAt",
            deletedAt: false, // Adjust if soft deletes are desired
            schema: "ccqc", // Specify schema if applicable
        }
    );
};
