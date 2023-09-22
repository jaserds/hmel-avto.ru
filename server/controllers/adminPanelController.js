import db from "../db.js";
import { ApiError } from "../exceptions/api-error.js";


class adminPanelController {

    async getAllCarsForAdminPanel(req, res){
        const [cars, metadata] = await db.query(
                `SELECT carID, BrandName, ModelName, GenerationName, GenerationAge, Price, Expenses, isSite, fio
                FROM cars
                inner join brand on cars.BrandID = brand.BrandID
                inner join models on models.ModelID = cars.ModelID
                inner join generation on cars.generation = generation.GenerationID
                inner join users on cars.UserId = users.id`)
            return res.json(cars)
    }

    async getPhotoPreviewByIDCarsForAdminPanel(req, res, next){
        console.log(req.query.carID);
        try{
            const [prewPhoto, metadata] = await db.query(
                `select photoID, fileName
                from photocars
                where carID = '${req.query.carID}'
                limit 2`)
                return res.json(prewPhoto[0])
        } catch (e){
            return next(ApiError.BadRequest('Произошла ошибка при запросе фотографии авто.', e))
          }
        }
}
export default new adminPanelController();