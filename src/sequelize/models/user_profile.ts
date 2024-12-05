import { DataTypes, Sequelize } from "sequelize";
import { UserProfileModel } from "./types"; // Adjust the path as needed

export const UserProfileFactory = (orm: Sequelize): UserProfileModel => {
    return <UserProfileModel>orm.define(
        "user_profile", // Table name in the database
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true, // Adjusted to true to allow for optional id
            },
            firstname: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            dob: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            contactNum1: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING(1000),
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            state: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            pincode: {
                type: DataTypes.STRING(10), // Adjusted length as per typical pincode size
                allowNull: true,
            },
            profilephoto: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            modifiedAt: {
                type: DataTypes.DATE,
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
