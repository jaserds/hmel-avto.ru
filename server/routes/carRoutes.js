import express from 'express';
import carController from "../controllers/carController.js"
import checkRoleMidlewares from '../middlewares/checkRole-midlewares.js';


const carRoutes = express.Router();

carRoutes.post('/addCar', checkRoleMidlewares('Manager'), carController.createCar);
carRoutes.get('/search', carController.searchInputsCars);
carRoutes.get('/search-cars', carController.searchCars);
carRoutes.get('/similar-cars', carController.getSimilarCars);
carRoutes.get('/all/recomendations-cars', carController.getAllRecomendationsCars);
carRoutes.get('/:carID', carController.getCarByID);
carRoutes.get('/photo/:carid', carController.getPhotoCarByCarId);
carRoutes.get('/photo/all/:carid', carController.getAllPhotoByCarId)
carRoutes.get('/documents/all/:carid', carController.getAllDocumentsByCarId)
carRoutes.delete('/delete/images', carController.deletePhotoCar)

export default carRoutes;