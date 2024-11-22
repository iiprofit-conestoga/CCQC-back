/**
 * This is the Helper Index file. 
 * Because of this file we dont need to import specific helper file at specific page we just need to import this file and 
 * we can access all the helper functionalities.
 * 
 */

// HTTP status helper file import.
import httpStatus from "./http_status";
import PermissionsList from "./Permissions";

// Return Object Template Method Code Start

type IResponseObject = {
    status: boolean
    code: number
    message: string
    data?: any | null
}

// This method is used to organize the return object. We will use this object in entire project to return the error/result of any method.
const getHandlerResponseObject = (
    status: boolean,
    code: number,
    message: string,
    data: any = null
): IResponseObject => {
    return {
        status,
        code,
        message,
        data,
    }
}
// Return Object Template Method Code End


// All helper modules exported as single object
export {
    httpStatus, 
    getHandlerResponseObject,
    PermissionsList
}