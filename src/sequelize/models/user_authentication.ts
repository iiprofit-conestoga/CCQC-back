import { DataTypes, Sequelize } from "sequelize";
import { UserAuthenticationnModel } from "./types"; // Adjust the path as needed

export const UserAuthenticationFactory = (orm: Sequelize): UserAuthenticationnModel => {
    return <UserAuthenticationnModel>orm.define(
        "user_authentication", // Table name in the database
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true, // Adjusted to true to allow for optional id
            },
            userinfo: {
                type: DataTypes.INTEGER,
                allowNull: true, // Optional foreign key
                references: {
                    model: "user_profile", // Table name for UserProfile
                    key: "id",              // Primary key in UserProfile
                },
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true, // Ensuring email is unique
            },
            passwordHash: {
                type: DataTypes.STRING(255),
                allowNull: true, // Optional
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: true, // Optional foreign key
                references: {
                    model: "role_master",
                    key: "id",
                },
            },
            refreshToken: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            resetPasswordToken: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            resetPasswordTokenExp: {
                type: DataTypes.DATE,
                allowNull: true,
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
            deletedAt: false, // Disable soft deletes,
            schema: "ccqc", // Schema name in the database
        }
    );
};
