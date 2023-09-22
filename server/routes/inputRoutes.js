import express from 'express';
import InputController from '../controllers/inputController.js';


const inputRouter = express.Router();

inputRouter.get('/brands', InputController.getAllBrands);
inputRouter.get('/driveUnit', InputController.getAllDriveUnit);
inputRouter.get('/all/city', InputController.getAllCities);
inputRouter.get('/all/transmissions', InputController.getAllTransmissions);
inputRouter.get('/all/body', InputController.getAllBody)
inputRouter.get('/colors', InputController.getAllColors);
inputRouter.get('/egineTypes', InputController.getAllEgineTypes);
inputRouter.get('/models/:brand', InputController.getModelsByBrand);
inputRouter.get('/body/:brand/', InputController.getBodyByBrand);
inputRouter.get('/body/:brand/:models/', InputController.getBodyByModel);
inputRouter.get('/transsmission/:brand', InputController.getTranssmissionByBrand);
inputRouter.get('/transsmission/:brand/:model', InputController.getTranssmissionByModel);
inputRouter.get('/driveUnit/:model', InputController.getDriveUnitModel);
inputRouter.get('/:brand/:model', InputController.getGenerationByModel);
inputRouter.post('/add/body', InputController.addBody);
inputRouter.post('/add/models-body', InputController.addBodyByModel);
inputRouter.post('/add/brand', InputController.addBrand);
inputRouter.post('/add/model-by-brand', InputController.addModelByBrandId);
inputRouter.post('/add/generation-by-mode-id', InputController.addGenerationByModelId);
inputRouter.post('/add/new-drive-unit', InputController.addDriveUnit);
inputRouter.post('/add/drive-unit', InputController.addDriveUnitByModel);
inputRouter.post('/add/transmission-by-model', InputController.addTranssmissionByModel);
inputRouter.post('/add/new-transsmissions', InputController.addTranssmissionsInDataBase);
inputRouter.post('/add/color', InputController.addColorDatabase);
inputRouter.post('/add/city', InputController.addCityDatabase);

export default inputRouter;