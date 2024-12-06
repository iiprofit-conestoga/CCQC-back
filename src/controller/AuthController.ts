/**
 * NOTE:
 * THIS PAGE CONTAIN VARIOUS OPERATION METHODS RELATED TO AUTHENTICATION.
 */

// Experss functions for getting response from body.
import { NextFunction, Request, Response } from "express";



// ValidationnResult method import for checking express-validator's end result.
import { validationResult } from "express-validator";

/**
 * Custom Module Import Section
 * @UserAuthModel This is mongoose model/schema of the user profile section. It store basic details of the users. This object will use for database operations.
 * @Logging This object is used for generating different types of Logs. We replace console logs with this custom utility.
 * @httpStatus This is helper section's object. It has pre-define error codes which we will re-use in this controller.
 * @getHandlerResponseObject This method is used to organize and send response back to the client. with the use of this method everytime we can send data in fix format.
 */
import { ProjectDB } from "../sequelize";
import Logging from "../middleware/Logging";
import { httpStatus, getHandlerResponseObject } from "../helper/Index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

let UserAuthenticationFactory = ProjectDB.UserAuthentication;


// Create method for adding users into database
const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Create object for the express-validator result checking
        const error = validationResult(req);

        // Check if any error occurred
        if (error.isEmpty()) {
            // Destructure req.body
            const { username, password } = req.body;

            // Find the user in the database
            const user : any = await UserAuthenticationFactory.findOne({ where: { username } });

            // Check if the user exists
            if (user) {
                // Compare the provided password with the hashed password in the database
                const passwordMatch = await bcrypt.compare(password, user.passwordHash as string);

                if (passwordMatch) {
                    // Passwords match, user is authenticated
                    // Generate and return a JWT token for authentication
                    const accessToken = jwt.sign(
                        { username: user.username , role: user.role_id },
                        process.env.ACCESS_TOKEN_SECRET as string,
                        { expiresIn: '20m' }
                    );

                    console.log(jwt.decode(accessToken)); // Log the payload
                    const refreshToken = jwt.sign(
                        { username: user.username , role: user.role_Id },
                        process.env.REFRESH_TOKEN_SECRET as string,
                        { expiresIn: '1h' }
                    );

                    // Save refresh token to the user in the database
                    user.refreshToken = refreshToken;
                    await user.save();

                    const { code, data, message } = getHandlerResponseObject(
                        true,
                        httpStatus.OK,
                        "User authenticated",
                        { accessToken, username: user.username, role: user.role_id }
                    );

                    return res.status(code)
                        .cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            maxAge: 24 * 60 * 60 * 1000  // 1 day
                        })
                        .json({ code, data, message });

                } else {
                    // Passwords do not match
                    const { code, data, message } = getHandlerResponseObject(
                        false,
                        httpStatus.UNAUTHORIZED,
                        "Invalid credentials",
                        "Invalid credentials"
                    );
                    return res.status(code).json({ code, data, message });
                }
            } else {
                // User not found
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.NOT_FOUND,
                    "User not found",
                    "User not found"
                );
                return res.status(code).json({ code, data, message });
            }
        }

        // Return express-validator error result
        const { code, data, message } = getHandlerResponseObject(
            false,
            httpStatus.BAD_REQUEST,
            "User Profile's validation error",
            error.array()
        );
        return res.status(code).json({ code, data, message });

    } catch (error) {
        Logging.error(error);
        const { code, data, message } = getHandlerResponseObject(
            false,
            httpStatus.INTERNAL_SERVER_ERROR,
            "Server error",
            "An error occurred during the login process"
        );
        return res.status(code).json({ code, data, message });
    }
};


// Encapsulate all obect into single object
const AuthController = {
    userLogin,
};

export default AuthController;