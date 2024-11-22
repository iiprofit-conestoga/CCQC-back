import { DataTypes, Sequelize } from "sequelize";
import { ServiceTaskModel } from "./types"; // Adjust the path as needed

export const ServiceTasksFactory = (orm: Sequelize): ServiceTaskModel => {
    return <ServiceTaskModel>orm.define(
        "service_task", // Table name in the database
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true,
            },
            taskType: {
                type: DataTypes.STRING,
                allowNull: false,
                // You can add validation for dropdown options if needed
                validate: {
                    isIn: [["Option1", "Option2", "Option3"]], // Replace with actual dropdown values
                },
            },
            taskName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            partId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "part_master", // References the part_master table
                    key: "id",
                },
            },
            serviceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "service_master", // References the service_master table
                    key: "id",
                },
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
