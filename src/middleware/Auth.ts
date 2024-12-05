import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { ProjectDB } from "../sequelize";
import { getHandlerResponseObject, httpStatus } from '../helper/Index';

let UserAuthenticationFactory = ProjectDB.UserAuthentication;


const jwtVerify = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, username: any) => {
            if (err) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.UNAUTHORIZED,
                    "User Unauthorized",
                    err
                );

                return res.status(code).json({ code, data, message });
            }
            req.user = username;
            next();
        });
    } else {
        const { code, data, message } = getHandlerResponseObject(
            true,
            httpStatus.OK,
            "User Unauthorized"
        );
        return res.status(code).json({ code, message, data });
    }
}

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
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
            const user = await UserAuthenticationFactory.findOne({ where: { username: decoded.username } });
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

export { jwtVerify }
