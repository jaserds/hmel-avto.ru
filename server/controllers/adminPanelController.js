import db from "../db.js";
import { ApiError } from "../exceptions/api-error.js";
import crypto from 'crypto';
import path from "path";


class adminPanelController {

    async getAllCarsForAdminPanel(req, res){
        try{
            const [cars, metadata] = await db.query(
                    `SELECT carID, BrandName, ModelName, GenerationName, GenerationAge, Price, isSite, fio
                    FROM cars
                    inner join brand on cars.BrandID = brand.BrandID
                    inner join models on models.ModelID = cars.ModelID
                    inner join generation on cars.generation = generation.GenerationID
                    inner join users on cars.UserId = users.id`);
            return res.json(cars)
        } catch (e) {
            return next(ApiError.BadRequest('Произошла ошибка при запросе автомобилей.', e))
        }
    }

    async getPhotoPreviewByIDCarsForAdminPanel(req, res, next){
        try{
            const [prewPhoto, metadata] = await db.query(
                `select photoID, fileName
                from photocars
                where carID = '${req.query.carID}'
                limit 2`);
                return res.json(prewPhoto[0]);
        } catch (e){
            return next(ApiError.BadRequest('Произошла ошибка при запросе фотографии авто.', e))
        }
    }

    async getExpensesByCarID(req, res, next){
      try{
        const [expenses, metadata] = await db.query(
            `SELECT id, ExpensesName, ExpensesDataTime, ExpensesSumm FROM db_cars.expenses where carID = '${req.query.carID}';`);
            return res.json(expenses);
      } catch (e){
          return next(ApiError.BadRequest('Произошла ошибка при запросе фотографии авто.', e))
      }
    }

    async getTotalExpenses(req, res, next){
      try{
        const [totoalExpenses, metadata] = await db.query(
            `SELECT SUM(ExpensesSumm) AS TotalExpenses
            FROM db_cars.expenses
            WHERE CarID = '${req.query.carID}';`);
            return res.json(totoalExpenses);
      } catch (e){
          return next(ApiError.BadRequest('Произошла ошибка при запросе фотографии авто.', e))
      }
    }

    async addPhotosCar(req, res, next){
        const files = req.files.files;
        const carID = req.body.carID
        const __dirname = path.resolve("");

        if (files !== undefined) {
            if ((files.length > 1) && (Array.isArray(files))) {
              files.forEach(async (file) => {
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                  const uniqueId = crypto.randomBytes(8).toString('hex');
                  const fileExtension = file.mimetype.split("/")[1];
                  const newFileName = `image_${uniqueId}.${fileExtension}`;
                  await db.query(`INSERT INTO photocars (fileName, carID) VALUES ('${newFileName}', '${carID}');`);
                  file.mv(path.resolve(__dirname, 'static', 'images', newFileName), (err) => {
                    if (err) {
                      return next(ApiError.BadRequest('Произошла ошибка при загрузки фотографии.', err))
                    }
                  });
                }
              });
            }
            else {
              const uniqueId = crypto.randomBytes(8).toString('hex');
              const fileExtension = files.mimetype.split("/")[1];
              const newFileName = `image_${uniqueId}.${fileExtension}`;
              await db.query(`INSERT INTO photocars (fileName, carID) VALUES ('${newFileName}', '${carID}');`);
              files.mv(path.resolve(__dirname, 'static', 'images', newFileName), (err) => {
                if (err) {
                  return next(ApiError.BadRequest('Произошла ошибка при загрузки фотографии.', err))
                }
              });
            }
          }
          else {
            // return res.status(400).send('Вы не добавили ни одной фотографии автомобиля');
            return next(ApiError.BadRequest('Вы не добавили ни одной фотографии автомобиля.', []))
          }

        return res.json('Файлы загружены');
    }

    async addDocumentsCar(req, res, next){
        const documents = req.files.documents;
        const carID = req.body.carID
        const __dirname = path.resolve("");

        if (documents !== undefined) {
            if ((documents.length > 1) && (Array.isArray(documents))) {
              documents.forEach(async (document) => {
                if (document.mimetype === 'image/jpeg' || document.mimetype === 'image/png') {
                  const uniqueId = crypto.randomBytes(8).toString('hex');
                  const fileExtension = document.mimetype.split("/")[1];
                  const newFileName = `image_${uniqueId}.${fileExtension}`;
                  await db.query(`INSERT INTO documents (documentName, carID) VALUES  ('${newFileName}', '${carID}');`);
                  document.mv(path.resolve(__dirname, 'static', 'documents', newFileName), (err) => {
                    if (err) {
                      return next(ApiError.BadRequest('Произошла ошибка при загрузке документа.', err))
                    }
                  });
                }
              });
            }
            else {
              const uniqueId = crypto.randomBytes(8).toString('hex');
              const fileExtension = documents.mimetype.split("/")[1];
              const newFileName = `image_${uniqueId}.${fileExtension}`;
              await db.query(`INSERT INTO documents (documentName, carID) VALUES ('${newFileName}', '${carID}');`);
              documents.mv(path.resolve(__dirname, 'static', 'documents', newFileName), (err) => {
                if (err) {
                  return next(ApiError.BadRequest('Произошла ошибка при загрузке документа.', err))
                }
              });
            }
          }
          else {
            return next(ApiError.BadRequest('Вы не добавили ни одного документа автомобиля.', []))
          }

        return res.json('Файлы загружены');
    }

    async delPhotoByID(req, res, next){
        try{
            const [photo, metadata] = await db.query(`DELETE FROM photocars WHERE (photoID = '${req.params.photoID}');`)
            return res.json('Фото успешно удалено');
        } catch (e){
            return next(ApiError.BadRequest('Произошла ошибка при удалении фотографии.', e))
        }
    }

    async delDocumentByID(req, res, next){
        try{
            const [document, metadata] = await db.query(`DELETE FROM documents WHERE (documentID = '${req.params.documentID}');`)
            return res.json('Документ успешно удален');
        } catch (e){
            return next(ApiError.BadRequest('Произошла ошибка при удалении документа.', e))
        }
    }

    async deleteAuto(req, res, next){
      try{
          const [car, metadata] = await db.query(`UPDATE cars SET isSite = '0' WHERE (carID = '${req.body.carID}');`)
          return res.json('Авто успешно удалено');
      } catch (e){
          return next(ApiError.BadRequest('Произошла ошибка при удалении авто.', e))
      }
    }

    async restoreAuto(req, res, next){
      try{
        const [carRestore, metadata] = await db.query(`UPDATE cars SET isSite = '1' WHERE (carID = '${req.body.carID}');`)
        return res.json('Авто успешно восстановлено');
      } catch (e){
        return next(ApiError.BadRequest('Произошла ошибка при восстановлении авто.', e))
    }
    }

    async delExpensesByID(req, res, next){
      try{
        const [expensesStatus, metadata] = await db.query(`DELETE FROM expenses WHERE (id = '${req.query.expensesID}');`)
        return res.json('Success');
      } catch (e){
        return next(ApiError.BadRequest('Произошла ошибка при удалении расхода', e))
      }
    }

    async updateDescriptionCar(req, res, next){
        const carID = req.body.carID

        try{
            const [description, metadata] = await db.query(`UPDATE cars SET DescriptionOfDefects = '${req.body.description}' WHERE (carID = '${carID}');`)
            return res.json('Описание успешно изменено');
        } catch (e){
            return next(ApiError.BadRequest('Произошла ошибка при изменении описания.', e))
        }
    }

    async addExpensesByCarID(req, res, next){
      try{
        const [expenses, metadata] = await db.query(`INSERT INTO expenses (ExpensesName, ExpensesDataTime, ExpensesSumm, CarID) VALUES ('${req.body.expensesName}', '${req.body.expensesDataTime}', '${req.body.expensesSumm}', '${req.body.carID}');`)
        return res.json(expenses);
      } catch (e){
        return next(ApiError.BadRequest('Произошла ошибка при добавлении расхода.', e))
      }
    }
    
    async updateCharacteristics(req, res, next){
        const carID = req.body.carID
        const characteristics = req.body.characteristics
        try{
            const [characteristic, metadata] = await db.query(`UPDATE cars SET VIN = '${characteristics.VIN}', Mileage = '${characteristics.mileage}', Age = '${characteristics.age}', Price = '${characteristics.price}', phone = '${characteristics.phone}' WHERE (carID = '${carID}');`)
            return res.json('Описание успешно изменено');
        } catch (e){
            return next(ApiError.BadRequest('Произошла ошибка при изменении характеристик.', e))
        }
    }

}
export default new adminPanelController();