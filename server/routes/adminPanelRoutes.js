import express from 'express';
import checkRoleMidlewares from '../middlewares/checkRole-midlewares.js';
import adminPanelController from '../controllers/adminPanelController.js';


const adminPanelRoutes = express.Router();

adminPanelRoutes.get('/get-all-car', checkRoleMidlewares('Manager'), adminPanelController.getAllCarsForAdminPanel);
adminPanelRoutes.get('/get-photo-preview', adminPanelController.getPhotoPreviewByIDCarsForAdminPanel);

export default adminPanelRoutes;