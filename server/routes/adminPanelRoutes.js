import express from 'express';
import checkRoleMidlewares from '../middlewares/checkRole-midlewares.js';
import adminPanelController from '../controllers/adminPanelController.js';


const adminPanelRoutes = express.Router();

adminPanelRoutes.get('/get-all-car', checkRoleMidlewares('Manager'), adminPanelController.getAllCarsForAdminPanel);
adminPanelRoutes.get('/get-photo-preview', checkRoleMidlewares('Manager'), adminPanelController.getPhotoPreviewByIDCarsForAdminPanel);
adminPanelRoutes.get('/get-expenses', checkRoleMidlewares('Manager'), adminPanelController.getExpensesByCarID);
adminPanelRoutes.get('/get-total-expenses', checkRoleMidlewares('Manager'), adminPanelController.getTotalExpenses);
adminPanelRoutes.post('/add-photos-car', checkRoleMidlewares('Manager'), adminPanelController.addPhotosCar);
adminPanelRoutes.post('/add-documents-car', checkRoleMidlewares('Manager'), adminPanelController.addDocumentsCar);
adminPanelRoutes.post('/update-description-car', checkRoleMidlewares('Manager'), adminPanelController.updateDescriptionCar);
adminPanelRoutes.post('/add-expenses', checkRoleMidlewares('Manager'), adminPanelController.addExpensesByCarID);
adminPanelRoutes.post('/update-characteristics-car', checkRoleMidlewares('Manager'), adminPanelController.updateCharacteristics);
adminPanelRoutes.post('/del-auto', checkRoleMidlewares('Manager'), adminPanelController.deleteAuto);
adminPanelRoutes.post('/restore-auto', checkRoleMidlewares('Manager'), adminPanelController.restoreAuto);
adminPanelRoutes.delete('/delete-photo/:photoID', checkRoleMidlewares('Manager'), adminPanelController.delPhotoByID);
adminPanelRoutes.delete('/delete-document/:documentID', checkRoleMidlewares('Manager'), adminPanelController.delDocumentByID);
adminPanelRoutes.delete('/delete-expenses', checkRoleMidlewares('Manager'), adminPanelController.delExpensesByID);

export default adminPanelRoutes;