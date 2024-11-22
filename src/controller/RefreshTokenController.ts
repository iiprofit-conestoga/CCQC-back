/**
 * NOTE:
 * THIS PAGE CONTAINS VARIOUS OPERATION METHODS RELATED TO AUTHENTICATION.
 */

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

// Custom module imports
import { ProjectDB } from "../sequelize"; // Sequelize model
let UserAuthModel = ProjectDB.UserAuthentication; // Sequelize model
import Logging from "../middleware/Logging";
import { getHandlerResponseObject, httpStatus } from "../helper/Index";

dotenv.config();

// Create method for handling refresh token
const handleRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Extract the refresh token from cookies
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            const { code, data, message } = getHandlerResponseObject(
                false,
                403,
                "No refresh token provided"
            );
            return res.status(code).json({ code, data, message });
        }

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err:any, decoded: any) => {
            if (err) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    403,
                    "Invalid refresh token"
                );
                return res.status(code).json({ code, data, message });
            }

            // Find the user in the database
            const user = await UserAuthModel.findOne({ where: { username: decoded.username } });
            if (!user || user.refreshToken !== refreshToken) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    403,
                    "Invalid refresh token"
                );
                return res.status(code).json({ code, data, message });
            }

            // Generate a new access token
            const accessToken = jwt.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: "30m" }
            );

            const { code, data, message } = getHandlerResponseObject(
                true,
                200,
                "New access token generated",
                accessToken
            );

            return res.status(code).json({ code, data, message });
        });
    } catch (error) {
        const { code, data, message } = getHandlerResponseObject(
            false,
            500,
            "Server error",
            "Failed to refresh access token"
        );
        return res.status(code).json({ code, data, message });
    }
};

// Encapsulate all methods into a single object
const RefreshController = {
    handleRefreshToken,
};

export default RefreshController;
