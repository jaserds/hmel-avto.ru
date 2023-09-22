import { ApiError } from "../exceptions/api-error.js";
import tokenService from "../service/tokenService.js";


function authMiddlewares(req, res, next){
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader){
            res.redirect("/login")
            return next(ApiError.UnauthorizedError())   
            
        }
        const acceessToken = authorizationHeader.split(' ')[1];
        if (!acceessToken){
            res.redirect("/login")
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(acceessToken)
        if (!userData){
            res.redirect("/login")
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}

export default authMiddlewares;