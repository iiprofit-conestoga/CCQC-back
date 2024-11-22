import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ProjectDB } from "../sequelize";
import { httpStatus, getHandlerResponseObject } from "../helper/Index";

export default (permissionToCheck: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const { code, data, message } = getHandlerResponseObject(
                false,
                httpStatus.UNAUTHORIZED,
                "Access token is missing or invalid"
            );
            return res.status(code).json({ code, data, message });
        }

        const token = authHeader.split(" ")[1];

        try {
            // Decode and verify the token
            const secret = process.env.ACCESS_TOKEN_SECRET as string;
            const decodedToken = jwt.verify(token, secret) as any;

            console.log(decodedToken);
            // Extract role_Id from the token
            const role_Id = decodedToken.role;

            if (!role_Id) {
                const { code, data, message } = getHandlerResponseObject(
                    false,
                    httpStatus.UNAUTHORIZED,
                    "Role ID is missing in the token"
                );
                return res.status(code).json({ code, data, message });
            }

            // Fetch permissions associated with the role
            const permissions = await ProjectDB.RolePermissionRelation.findAll({
                where: { role_id : role_Id },
                attributes: ["permission_id"],
                raw: true, // Returns plain objects
            });

            console.log(permissions);
            // Transform permissions into an array of IDs
            const permissionList = permissions.map((perm: any) => perm.permission_id);
            console.log(permissionList);

            // Check if the required permission exists
            const isPermitted = permissionList.includes(permissionToCheck);

            if (isPermitted) {
                next(); // Permission granted, proceed to the next middleware
            } else {
                res.status(httpStatus.FORBIDDEN).send("Forbidden: You do not have the required permission");
            }
        } catch (error: any) {
            res.status(httpStatus.UNAUTHORIZED).json({
                code: httpStatus.UNAUTHORIZED,
                message: "Invalid or expired token",
                error: error.message,
            });
        }
    };
};