import db from "../db.js"
import crypto from 'crypto'
import path from "path"
import fs from "fs"
import { ApiError } from "../exceptions/api-error.js";


class CarController {

  async getAllRecomendationsCars(req, res) {
    let { limit, page } = req.query
    page = page || 1
    limit = limit || 15
    let offset = page * limit - limit
    const [recomendationCars] = await db.query(
      `select cars.carID, brand.brandName, models.ModelName, generation.GenerationName, cars.Mileage, cars.Age, cars.Price
            from cars
            inner join (brand inner join models on brand.BrandID = models.BrandID) on cars.ModelID = models.ModelID
            inner join generation on cars.generation = generation.GenerationID
            where isSite = 1
            LIMIT ${limit} OFFSET ${offset};
            `)

    for (let caritem of recomendationCars) {
      const [imageCar, metadat] = await db.query(
        `SELECT photoID, fileName 
                FROM photocars
                where carID = '${caritem.carID}'`)
      caritem['image'] = imageCar;
    }

    return res.json(recomendationCars)
  }

  async getPhotoCarByCarId(req, res) {
    const [images, metadata] = await db.query(
      `SELECT photoID, fileName
            from photocars
            where carID = '${req.params.carid}'
            LIMIT 1`)
    return res.json(images)
  }
  
  async getAllPhotoByCarId(req, res) {
    let dataImages = [];
    const [images, metadata] = await db.query(
      `SELECT photoID, fileName
            from photocars
            where carID = '${req.params.carid}'
            `)
    dataImages = images.map(data => {
      return { ...data, url: 'https://hmel-avto.ru/images/' }
    })
    return res.json(dataImages)
  }

  async getAllDocumentsByCarId(req, res) {
    let dataDocs = [];
    const [documents, metadata] = await db.query(
      `SELECT documentID, documentName
            FROM documents
            WHERE carID = '${req.params.carid}'
            `)
    dataDocs = documents.map(data => {
      return { ...data, url: 'https://hmel-avto.ru/documents/' }
    })
    return res.json(dataDocs)
  }

  async getCarByID(req, res) {
    const [car, metadata] = await db.query(
      `SELECT carID, VIN, BrandName, models.ModelName, generation.GenerationName, 
            generation.GenerationAge, bodytypes.BodyName, enginetypes.EnginTypeName, 
            transsmissions.TranssmissionsName, cars.rule, colors_car.ColorName, driveunit.DriveUnitName, 
            cars.VolumeEngine, cars.EnginePower, cars.Mileage, cars.QtyPerson, cars.Age, cars.Price, 
            cars.Customs, cars.PTS, cars.DescriptionOfDefects, cars.State, cars.phone, cities.CityName, cars.isSite
            FROM db_cars.cars
            inner join models on cars.ModelID = models.ModelID
            inner join brand on models.BrandID = brand.BrandID
            inner join (generation inner join models model on generation.ModelID = model.ModelID) on cars.generation = generation.GenerationID
            inner join (bodytypes inner join (models modelsBody inner join modelandbody on modelsBody.ModelID = modelandbody.ModelID) on bodytypes.BodyID = modelandbody.BodyID) on cars.BodyID = modelandbody.id
            inner join enginetypes on enginetypes.EngineID = cars.EnginTypeID
            inner join (transsmissions inner join (models m inner join transsmission_model on m.ModelID = transsmission_model.ModelID) on transsmissions.TransID = transsmission_model.TranssmissionID) on cars.TranssmissnionTypeID = transsmission_model.id
            inner join colors_car on colors_car.ColorID = ColorCarID
            inner join (driveunit inner join (models modelDriveUnit inner join driveunit_model on modelDriveUnit.ModelID = driveunit_model.ModelID) on driveunit.id = driveunit_model.DriveUnitID) on cars.DriveUnitID = driveunit_model.id
            inner join cities on City = cities.idCity
            where carID = '${req.params.carID} AND isSite = 1'`)
    return res.json(car[0])
  }

  async getSimilarCars(req, res){
    let {dataSimilarCars} = req.query;
    if (dataSimilarCars === undefined){
	return;
    }

    try{
      const [similarCars, metadata] = await db.query(
        `
          select carID, BrandName, ModelName, Price, Age, Mileage from cars
          inner join brand on brand.BrandID = cars.BrandID
          inner join models on models.ModelID = cars.ModelID
          where BrandName = '${dataSimilarCars.carBrand}' and ModelName = '${dataSimilarCars.carModel}' and (Price > ${dataSimilarCars.carPrice - dataSimilarCars.carPrice / 100 * 10} and Price < ${dataSimilarCars.carPrice + dataSimilarCars.carPrice / 100 * 10})
          where isSite = 1
          limit 4
          `)
          
      const filtersSimilarCars = similarCars.filter(car => car.carID !== dataSimilarCars.carID)
      let similarCarsData = null;

      if (filtersSimilarCars.length <= 3){
        const similarCarsDataId = filtersSimilarCars.slice(0, filtersSimilarCars.length).map(car => car.carID);
        similarCarsData = similarCarsDataId.map((element) => `${element}`).join(', ');
      } else {
        const similarCarsDataId = filtersSimilarCars.slice(0, 3).map(car => car.carID);
        similarCarsData = similarCarsDataId.map((element) => `${element}`).join(', ');
      }

      const [similarCarsPhoto, metadataPhoto] = await db.query(
        `
        WITH RankedPhotos AS (
          SELECT
            photoID,
            fileName,
            carID,
            ROW_NUMBER() OVER (PARTITION BY carID ORDER BY photoID) AS rn
          FROM photocars
          WHERE carID IN (${similarCarsData})
        )
        SELECT photoID, fileName, carID
        FROM RankedPhotos
        WHERE rn = 1;
        `)

     filtersSimilarCars.forEach((element, index) => {
	if (index+1 > 3) {return}
	element['photocar'] = similarCarsPhoto[index].fileName;
	});
     
      return res.json(filtersSimilarCars.slice(0, 3))

    }
    catch (e){
      console.log(e);
    }      
  }
  
  async searchCars(req, res) {

    let { limit, page } = req.query
    page = page || 1
    limit = limit || 15
    let offset = page * limit - limit

    const searchText = req.query.searchtext.split(' ')
    
    let sqlQuery = `
    SELECT carID, VIN, BrandName, models.ModelName, generation.GenerationName, 
    generation.GenerationAge, bodytypes.BodyName, enginetypes.EnginTypeName, 
    transsmissions.TranssmissionsName, cars.rule, colors_car.ColorName, driveunit.DriveUnitName, 
    cars.VolumeEngine, cars.EnginePower, cars.Mileage, cars.Age, cars.Price, cities.CityName
    FROM cars
    inner join models on cars.ModelID = models.ModelID
    inner join brand on models.BrandID = brand.BrandID
    inner join (generation inner join models model on generation.ModelID = model.ModelID) on cars.generation = generation.GenerationID
    inner join (bodytypes inner join (models modelsBody inner join modelandbody on modelsBody.ModelID = modelandbody.ModelID) on bodytypes.BodyID = modelandbody.BodyID) on cars.BodyID = modelandbody.id
    inner join enginetypes on enginetypes.EngineID = cars.EnginTypeID
    inner join (transsmissions inner join (models m inner join transsmission_model on m.ModelID = transsmission_model.ModelID) on transsmissions.TransID = transsmission_model.TranssmissionID) on cars.TranssmissnionTypeID = transsmission_model.id
    inner join colors_car on colors_car.ColorID = ColorCarID
    inner join (driveunit inner join (models modelDriveUnit inner join driveunit_model on modelDriveUnit.ModelID = driveunit_model.ModelID) on driveunit.id = driveunit_model.DriveUnitID) on cars.DriveUnitID = driveunit_model.id
    inner join cities on City = cities.idCity
    WHERE isSite = 1 AND`;

    if (searchText.length === 1){
      sqlQuery += ` CONCAT(BrandName, ' ', 
      models.ModelName, ' ',
      generation.GenerationName, ' ',
      bodytypes.BodyName, ' ',
      enginetypes.EnginTypeName, ' ',
      transsmissions.TranssmissionsName, ' ',
      colors_car.ColorName) LIKE '%${searchText[0]}%'`;
    } else {
      sqlQuery += ` CONCAT(BrandName, ' ', 
      models.ModelName, ' ',
      generation.GenerationName, ' ',
      bodytypes.BodyName, ' ',
      enginetypes.EnginTypeName, ' ',
      transsmissions.TranssmissionsName, ' ',
      colors_car.ColorName) LIKE '%${searchText[0]}%'`;

      for (let i = 1; i < searchText.length; i++){
        sqlQuery += ` AND (CONCAT(BrandName, ' ', 
        models.ModelName, ' ',
        generation.GenerationName, ' ',
        bodytypes.BodyName, ' ',
        enginetypes.EnginTypeName, ' ',
        transsmissions.TranssmissionsName, ' ',
        colors_car.ColorName) LIKE '%${searchText[i]}%')`
      }
    }

    sqlQuery += ` LIMIT ${limit} OFFSET ${offset}`

    const [cars, metadata] = await db.query(sqlQuery)
    return res.json(cars)
  }

  async searchInputsCars(req, res, next) {

    let { limit, page } = req.query
    page = page || 1
    limit = limit || 15
    let offset = page * limit - limit

    const dataCars = req.query;
    const conditions = [];

    for (const key in dataCars) {
      if (key === 'limit' || key === 'page'){
        continue
      }
      const value = dataCars[key];
      if (value !== null && value !== undefined && value !== '') {
        if (key === 'price' || key === 'priceEnd' || key === 'mileage' || key === 'mileageEnd' || key === 'age' || key === 'ageEnd' || key === 'VolumeEngine' || key === 'VolumeEngineEnd') {
          if (key === 'VolumeEngine' && dataCars['VolumeEngineEnd'] === undefined) {
            conditions.push(`VolumeEngine >= ${value}`)
          }
          if (key === 'VolumeEngineEnd' && dataCars['VolumeEngine'] === undefined) {
            conditions.push(`VolumeEngine <= ${value}`)
          }
          if (key === 'VolumeEngineEnd' && dataCars['VolumeEngine'] !== undefined) {
            conditions.push(`VolumeEngine BETWEEN ${dataCars['VolumeEngine']} AND ${dataCars['VolumeEngineEnd']}`)
          }
          if (key === 'price' && dataCars['priceEnd'] === undefined) {
            conditions.push(`price >= ${value}`)
          }
          if (key === 'priceEnd' && dataCars['price'] === undefined) {
            conditions.push(`price <= ${value}`)
          }
          if (key === 'priceEnd' && dataCars['price'] !== undefined) {
            conditions.push(`price BETWEEN ${dataCars['price']} AND ${dataCars['priceEnd']}`)
          }
          if (key === 'mileage' && dataCars['mileageEnd'] === undefined) {
            conditions.push(`mileage >= ${value}`)
          }
          if (key === 'mileageEnd' && dataCars['mileage'] === undefined) {
            conditions.push(`mileage <= ${value}`)
          }
          if (key === 'mileageEnd' && dataCars['mileage'] !== undefined) {
            conditions.push(`mileage BETWEEN ${dataCars['mileage']} AND ${dataCars['mileageEnd']}`)
          }
          if (key === 'age' && dataCars['ageEnd'] === undefined) {
            conditions.push(`age >= ${value}`)
          }
          if (key === 'ageEnd' && dataCars['age'] === undefined) {
            conditions.push(`age <= ${value}`)
          }
          if (key === 'ageEnd' && dataCars['age'] !== undefined) {
            conditions.push(`age BETWEEN ${dataCars['age']} AND ${dataCars['ageEnd']}`)
          }
        } else {
          conditions.push(`cars.${key} = '${value}'`);
        }
      }
    }

    let sqlQuery = `SELECT carID, VIN, BrandName, models.ModelName, generation.GenerationName, 
                        generation.GenerationAge, bodytypes.BodyName, enginetypes.EnginTypeName, 
                        transsmissions.TranssmissionsName, cars.rule, colors_car.ColorName, driveunit.DriveUnitName, 
                        cars.VolumeEngine, cars.EnginePower, cars.Mileage, cars.QtyPerson, cars.Age, cars.Price, 
                        cars.Customs, cars.PTS, cars.DescriptionOfDefects, cars.State, cities.CityName
                        FROM cars
                        inner join models on cars.ModelID = models.ModelID
                        inner join brand on models.BrandID = brand.BrandID
                        inner join (generation inner join models model on generation.ModelID = model.ModelID) on cars.generation = generation.GenerationID
                        inner join (bodytypes inner join (models modelsBody inner join modelandbody on modelsBody.ModelID = modelandbody.ModelID) on bodytypes.BodyID = modelandbody.BodyID) on cars.BodyID = modelandbody.id
                        inner join enginetypes on enginetypes.EngineID = cars.EnginTypeID
                        inner join (transsmissions inner join (models m inner join transsmission_model on m.ModelID = transsmission_model.ModelID) on transsmissions.TransID = transsmission_model.TranssmissionID) on cars.TranssmissnionTypeID = transsmission_model.id
                        inner join colors_car on colors_car.ColorID = ColorCarID
                        inner join (driveunit inner join (models modelDriveUnit inner join driveunit_model on modelDriveUnit.ModelID = driveunit_model.ModelID) on driveunit.id = driveunit_model.DriveUnitID) on cars.DriveUnitID = driveunit_model.id
                        inner join cities on City = cities.idCity`;


    if (conditions.length > 0) {
      sqlQuery += ' WHERE isSite = 1 AND ' + conditions.join(' AND ');
    } else {
      sqlQuery += ' WHERE isSite = 1'
    }

    sqlQuery = sqlQuery += ` LIMIT ${limit} OFFSET ${offset}`

    try{
      const [cars, metadata] = await db.query(sqlQuery)
      return res.json(cars)
    } catch (e){
      return next(ApiError.BadRequest('* Не верный поисковый запрос', e))
    }
    
  };

  async deletePhotoCar(req, res) {

    const [images, metadata] = await db.query('SELECT fileName FROM db_cars.photocars;')
    const [docs, metadataDocs] = await db.query('SELECT documentName FROM db_cars.documents;')

    const filesToKeepImg = images;
    const filesToKeepDocs = docs

 
    const folderPathImg = './static/images';
    const folderPathDocs = './static/documents';

    fs.readdir(folderPathDocs, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Ошибка при чтении папки');
      }

    const newDocsToKeep = filesToKeepDocs.map(file => file.documentName);

    files.forEach(file => {
      if (!newDocsToKeep.includes(file)) {
        const filePath = path.join(folderPathDocs, file);
        fs.unlink(filePath, err => {
          if (err) {
            console.error(err);
            return res.status(500).send('Ошибка при удалении файла');
          }
        });
      }
    }); 
    });


  fs.readdir(folderPathImg, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Ошибка при чтении папки');
    }

    const newfilesToKeep = filesToKeepImg.map(file => file.fileName);

    files.forEach(file => {
      if (!newfilesToKeep.includes(file)) {
        const filePath = path.join(folderPathImg, file);
        fs.unlink(filePath, err => {
          if (err) {
            console.error(err);
            return res.status(500).send('Ошибка при удалении файла');
          }
        });
      }
    }); 

      res.status(200).send('Файлы успешно удалены');
    });
  }

  

  async createCar(req, res) {
    const __dirname = path.resolve("")
    const files = req.files.files;
    const documents = req.files.documents;

    const [addCar, metadata] = await db.query(
      `INSERT INTO cars (VIN, BrandID, ModelID, generation, BodyID, EnginTypeID, TranssmissnionTypeID,
                rule, ColorCarID, DriveUnitID, VolumeEngine, EnginePower, Mileage,
                QtyPerson, Age, Price, Customs, PTS, DescriptionOfDefects, State, phone, City, UserId) 
            VALUES ('${req.body.VIN}', '${req.body.BrandID}', '${req.body.ModelID}', '${req.body.generation}', '${req.body.BodyID}', '${req.body.EnginTypeID}', '${req.body.TranssmissnionTypeID}',
            '${req.body.rule}', '${req.body.ColorCarID}', '${req.body.DriveUnitID}', '${req.body.VolumeEngine}', '${req.body.EnginePower}', '${req.body.Mileage}',
            '${req.body.QtyPerson}', '${req.body.Age}', '${req.body.Price}', '${req.body.Customs}', '${req.body.PTS}', '${req.body.DescriptionCar}', '${req.body.State}', '${req.body.Phone}', '${req.body.City}', '${req.body.UserId}');`)

    if (files !== undefined) {
      if ((files.length > 1) && (Array.isArray(files))) {
        files.forEach(async (file) => {
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            const uniqueId = crypto.randomBytes(8).toString('hex');
            // Получение расширения файла изображения (например, jpg, png)
            const fileExtension = file.mimetype.split("/")[1];
            // Генерация нового имени файла с добавлением уникального идентификатора
            const newFileName = `image_${uniqueId}.${fileExtension}`;

            await db.query(`INSERT INTO photocars (fileName, carID) VALUES ('${newFileName}', '${addCar}');`);

            file.mv(path.resolve(__dirname, 'static', 'images', newFileName), (err) => {
              if (err) {
                // return res.status(500).send(err);
                console.log("1 res status" + err)

              }
            });
          }
        });
      }
      else {
        const uniqueId = crypto.randomBytes(8).toString('hex');
        // Получение расширения файла изображения (например, jpg, png)
        const fileExtension = files.mimetype.split("/")[1];
        // Генерация нового имени файла с добавлением уникального идентификатора
        const newFileName = `image_${uniqueId}.${fileExtension}`;

        await db.query(`INSERT INTO photocars (fileName, carID) VALUES ('${newFileName}', '${addCar}');`);

        files.mv(path.resolve(__dirname, 'static', 'images', newFileName), (err) => {
          if (err) {
            // return res.status(500).send(err);
            console.log("2 res status" + err)
          }
        });
      }
    }
    else {
      // return res.status(400).send('Вы не добавили ни одной фотографии автомобиля');
      console.log("Вы не добавили ни одной фотографии автомобиля")
    }

    if (documents !== undefined) {
      if ((documents.length > 1) && (Array.isArray(documents))) {
        documents.forEach(async (file) => {
          const uniqueId = crypto.randomBytes(8).toString('hex');
          // Получение расширения файла изображения (например, jpg, png)
          const fileExtension = file.name.split(".").at(-1);
          // Генерация нового имени файла с добавлением уникального идентификатора
          const newFileName = `document_${uniqueId}.${fileExtension}`;

          await db.query(`INSERT INTO documents (documentName, carID) VALUES ('${newFileName}','${addCar}');`);

          file.mv(path.resolve(__dirname, 'static', 'documents', newFileName), (err) => {
            if (err) {
              // return res.status(500).send(err);
              console.log("3 res status" + err)
            }
          });
        });
      }
      else {
        const uniqueId = crypto.randomBytes(8).toString('hex');
        // Получение расширения файла изображения (например, jpg, png)
        const fileExtension = documents.name.split(".").at(-1);
        // Генерация нового имени файла с добавлением уникального идентификатора
        const newFileName = `document_${uniqueId}.${fileExtension}`;

        await db.query(`INSERT INTO documents (documentName, carID) VALUES ('${newFileName}', '${addCar}');`)
        documents.mv(path.resolve(__dirname, 'static', 'documents', newFileName), (err) => {
          if (err) {
            // return res.status(500).send(err);
            console.log("4 res status" + err)
          }
        });
      }
    }
    else {
      // return res.status(400).send('Вы не добавили ни одного документа автомобиля');
      console.log("Вы не добавили ни одного документа автомобиля")
    }
  }
}

export default new CarController();