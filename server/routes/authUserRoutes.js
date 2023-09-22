import express from 'express';
import UserController from "../controllers/userController.js"
import authMiddlewares from '../middlewares/auth-middlewares.js';


const authUser = express.Router();

authUser.post("/register", UserController.registration);
authUser.post("/register-manager", UserController.registrationManager);
authUser.get("/activate/:link", UserController.activate);
authUser.post("/login", UserController.login);
authUser.post("/loginManager", UserController.loginManager);
authUser.post("/logout", UserController.logout);
authUser.get("/refresh", UserController.refresh);

export default authUser;
