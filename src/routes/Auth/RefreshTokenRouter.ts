import express from 'express';
import { RefreshController } from '../../controller/Index'; // Adjust the import path as necessary

const RefreshRouter = express.Router();

// Route to get a single User Profile by ID
RefreshRouter.post('/refresh', RefreshController.handleRefreshToken);


export { RefreshRouter }
