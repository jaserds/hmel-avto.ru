import { ApiError } from "../exceptions/api-error.js";


function errorResponce(err, req, res, next) {
    if (err instanceof ApiError){
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка' + err})
}

export default errorResponce;