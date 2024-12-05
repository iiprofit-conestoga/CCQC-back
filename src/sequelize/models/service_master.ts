import { DataTypes, Sequelize } from "sequelize";
import { ServiceMasterModel } from "./types"; // Adjust the path as needed

export const ServiceMasterFactory = (orm: Sequelize): ServiceMasterModel => {
    return <ServiceMasterModel>orm.define(
        "service_master", // Table name in the database
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            vinNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            remarks: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "customer_master", // References the customer_master table
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
            modelMasterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "model_master", // References the model_master table
                    key: "id",
                },
            },
            mechanicName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            serviceType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [["Option1", "Option2", "Option3"]], // Replace with actual dropdown values
                },
            },
            serviceDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            modelYear: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            servicePrice: {
                type: DataTypes.STRING,
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
            deletedAt: false, // Adjust if soft deletes are desired
            schema: "ccqc", // Specify schema if applicable
        }
    );
};
