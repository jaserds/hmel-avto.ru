import express from 'express';
import authUserRoutes from './authUserRoutes.js';
import carRouter from './carRoutes.js';
import inputRouter from './inputRoutes.js';
import adminPanelRoutes from './adminPanelRoutes.js';



const mainRoute = express.Router();

mainRoute.use('/input', inputRouter);
mainRoute.use('/car', carRouter);
mainRoute.use('/user', authUserRoutes);
mainRoute.use('/panel', adminPanelRoutes);



export default mainRoute;