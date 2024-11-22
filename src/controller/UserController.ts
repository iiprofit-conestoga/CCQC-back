/**
 * NOTE:
 * THIS PAGE CONTAIN VARIOUS OPERATION METHODS RELATED TO USER PROFILE SECTION.
 */

// Express functions for getting response from body.
import { NextFunction, Request, Response } from "express";


// ValidationResult method import for checking express-validator's end result.
import { validationResult } from "express-validator";

// Bycryptjs import for password hashing
import bcrypt from "bcryptjs";

// env import for getting environment variables
import { env } from "process";


// Custom Module Import Section
import { ProjectDB } from "../sequelize"; // Sequelize models

let UserProfile = ProjectDB.UserProfile;
let UserAuth = ProjectDB.UserAuthentication;

import Logging from "../middleware/Logging";
import { httpStatus, getHandlerResponseObject } from "../helper/Index";

// Create method for adding users into database
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const {
                firstname,
                lastname,
                dob,
                contactNum1,
                address,
                city,
                state,
                pincode,
                isActive,
                username,
                email,
                roles,
                curentUser,
                profilephoto
            } = req.body;

            const userProfile = await UserProfile.create({
                firstname,
                lastname,
                dob,
                contactNum1,
                address,
                city,
                state,
                pincode,
                isActive,
                profilephoto
            });

            if (!userProfile) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    code: httpStatus.BAD_REQUEST,
                    message: "User Profile is not created, please try again"
                });
            }

            const password = req.body.password;
            if (!password) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    code: httpStatus.BAD_REQUEST,
                    message: "Password is required"
                });
            }

            let ROUND = parseInt(process.env.SALT_ROUNDS || '10');
            if (isNaN(ROUND) || ROUND < 1) {
                ROUND = 10; // Default value
            }

            const salt = await bcrypt.genSalt(ROUND);
            const passwordHash = await bcrypt.hash(password, salt);
            
            const userAuth = await UserAuth.create({
                username,
                email,
                passwordHash,
                userinfo: userProfile.id,
                createdBy: curentUser,
                modifiedBy: curentUser,
                role_id: roles
            });

            const { code, data, message } = getHandlerResponseObject(
                true,
                httpStatus.OK,
                "User Profile Details Added Successfully",
                userAuth
            );

            return res.status(code).json({ code, data, message });
        }

        const { code, data, message } = getHandlerResponseObject(
            false,
            httpStatus.BAD_REQUEST,
            "User Profile's validation error",
            errors.array()
        );
        return res.status(code).json({ code, data, message });
    } catch (error:any) {
        Logging.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: "An error occurred while creating the user",
            error: error.message || error
        });
    }
};

const findSingle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userProfileId = req.params.id;
        const userProfile = await UserProfile.findByPk(userProfileId);

        if (!userProfile) {
            const { code, data, message } = getHandlerResponseObject(
                false,
                httpStatus.NOT_FOUND,
                "User Profile is not found"
            );
            return res.status(code).json({ code, message, data });
        }

        const { code, data, message } = getHandlerResponseObject(
            true,
            httpStatus.OK,
            "Single User Profile details fetched successfully",
            userProfile
        );
        return res.status(code).json({ code, message, data });
    } catch (error) {
        Logging.error(error);
    }
};

const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userProfiles = await UserProfile.findAll();

        if (!userProfiles) {
            const { code, data, message } = getHandlerResponseObject(
                false,
                httpStatus.NOT_FOUND,
                "User Profiles are not found"
            );
            return res.status(code).json({ code, message, data });
        }

        const { code, data, message } = getHandlerResponseObject(
            true,
            httpStatus.OK,
            "All User Profiles details fetched successfully",
            userProfiles
        );
        return res.status(code).json({ code, message, data });
    } catch (error) {
        Logging.error(error);
    }
};

const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const userProfileId = req.params.id;
            const updatedUserProfileData = req.body;

            const userProfile = await UserProfile.findByPk(userProfileId);

            if (!userProfile) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.NOT_FOUND,
                    "User Profile is not found"
                );
                return res.status(code).json({ code, message, data });
            }

            const result = await userProfile.update(updatedUserProfileData);

            const { code, data, message } = getHandlerResponseObject(
                true,
                httpStatus.OK,
                "User Profile Details Updated Successfully",
                result
            );
            return res.status(code).json({ code, message, data });
        }

        const { code, data, message } = getHandlerResponseObject(
            false,
            httpStatus.NOT_FOUND,
            "User Profile's validation error",
            errors.array()
        );
        return res.status(code).json({ code, data, message });
    } catch (error) {
        Logging.error(error);
    }
};

const deleteSingle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userProfileId = req.params.id;
        const userProfile = await UserProfile.findByPk(userProfileId);

        if (!userProfile) {
            const { code, data, message } = getHandlerResponseObject(
                false,
                httpStatus.NOT_FOUND,
                "User Profile is not found"
            );
            return res.status(code).json({ code, message, data });
        }

        await UserAuth.destroy({ where: { userinfo: userProfileId } });
        await userProfile.destroy();

        const { code, data, message } = getHandlerResponseObject(
            true,
            httpStatus.OK,
            "Single User Profile details Deleted successfully"
        );
        return res.status(code).json({ code, message, data });
    } catch (error) {
        Logging.error(error);
    }
};

const UserProfileController = {
    create,
    findSingle,
    findAll,
    update,
    deleteSingle
};

export default UserProfileController;
