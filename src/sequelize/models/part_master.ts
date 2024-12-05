import { DataTypes, Sequelize } from "sequelize";
import { PartMasterModel } from "./types"; // Adjust the path as needed

export const PartMasterFactory = (orm: Sequelize): PartMasterModel => {
    return <PartMasterModel>orm.define(
        "part_master", // Table name in the database
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true,
            },
            partName: {
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
                    model: "user_profile",
                    key: "id",
                },
            },
            modifiedBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
            deletedAt: false, // Adjust if you want to support soft deletes
            schema: "ccqc", // Specify schema if applicable
        }
    );
};
