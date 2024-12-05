import express from "express";
import { AuthController } from "../../controller/Index"; // Adjust the import path as necessary

const AuthRouter = express.Router();


// Route to get a single User Profile by ID
AuthRouter.post("/login", AuthController.userLogin);

export { AuthRouter };
