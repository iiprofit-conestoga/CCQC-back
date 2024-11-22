import { param, body } from "express-validator";
const validator = require("validator");

let permissionCreate = () => {
    return [

        body("permissionName")
            .notEmpty()
            .withMessage("Permission name is required.")
            .isLength({ min: 3, max: 25 })
            .withMessage("Permission name is not valid")
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
        body("description")
            .notEmpty()
            .withMessage("Description name is required.")
            .isLength({ min: 3, max: 500 })
            .withMessage("Description is not valid")
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
        body("isActive")
            .notEmpty()
            .withMessage("isActive is required")
            .isNumeric()
            .withMessage("isActive must be numeric")
            .isLength({ min: 1, max: 1 })
            .withMessage("isActive length is invalid")
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
        body("createdBy")
            .optional({ checkFalsy: true, nullable: true })
            .isLength({ min: 24, max: 24 })
            .withMessage("Created By must be a 24 character hex string.")
            .isHexadecimal()
            .withMessage('ID must be a hexadecimal string.')
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
        body("modifiedBy")
            .optional({ checkFalsy: true, nullable: true })
            .isLength({ min: 24, max: 24 })
            .withMessage("Created By must be a 24 character hex string.")
            .isHexadecimal()
            .withMessage('ID must be a hexadecimal string.')
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
    ];
};

let permissionSingleGet = () => {
    return [
        param("id")
            .notEmpty()
            .withMessage("Id is required 2")
            .isLength({ min: 24, max: 24 })
            .withMessage("ID must be a 24 character hex string. 2")
            .isHexadecimal()
            .withMessage('ID must be a hexadecimal string. 2')
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            })
    ]
}

let permissionSingleDelete = () => {
    return [
        param("id")
            .notEmpty()
            .withMessage("Id is required")
            .isLength({ min: 24, max: 24 })
            .withMessage("ID must be a 24 character hex string.")
            .isHexadecimal()
            .withMessage('ID must be a hexadecimal string.')
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            })
    ]
}

let permissionUpdate = () => {
    return [
        body("permissionName")
            .optional({ checkFalsy: true, nullable: true })
            .isLength({ min: 3, max: 25 })
            .withMessage("Permission name is not valid")
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
        body("description")
            .optional({ checkFalsy: true, nullable: true })
            .isLength({ min: 3, max: 500 })
            .withMessage("Description is not valid")
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
        body("isActive")
            .optional({ checkFalsy: true, nullable: true })
            .isNumeric()
            .withMessage("isActive must be numeric")
            .isLength({ min: 1, max: 1 })
            .withMessage("isActive length is invalid")
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
        body("createdBy")
            .optional({ checkFalsy: true, nullable: true })
            .isLength({ min: 24, max: 24 })
            .withMessage("Created By must be a 24 character hex string.")
            .isHexadecimal()
            .withMessage('ID must be a hexadecimal string.')
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
        body("modifiedBy")
            .optional({ checkFalsy: true, nullable: true })
            .isLength({ min: 24, max: 24 })
            .withMessage("Created By must be a 24 character hex string.")
            .isHexadecimal()
            .withMessage('ID must be a hexadecimal string.')
            .trim()
            .customSanitizer((value: any) => {
                return validator.escape(value);
            }),
    ];
};

let permissionSchema = {
    permissionCreate,
    permissionSingleGet,
    permissionSingleDelete,
    permissionUpdate
};

export default permissionSchema;
