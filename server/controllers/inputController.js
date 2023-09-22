import db from "../db.js"
import brand from "../models/brand.js"

class InputController{

    async addBrand(req, res, next) {
        const [brand, metadata] = await db.query(
            `
            INSERT INTO brand (BrandName) VALUES ('${req.body.brandName}');
            `)
            return res.json(brand);
    };

    async addDriveUnit(req, res, next) {
        const [driveUnit, metadata] = await db.query(
            `
            INSERT INTO driveunit (DriveUnitName) VALUES ('${req.body.driveUnitValue}');
            `)
            return res.json(driveUnit);
    };

    async addModelByBrandId(req, res, next){
        const [model, metadata] = await db.query(
            `
            INSERT INTO models (ModelName, BrandID) VALUES ('${req.body.modelName}', '${req.body.brandId}');
            `)
            return res.json(model);
    };

    async addDriveUnitByModel(req, res, next){
        const [driveUnitId, metadata] = await db.query(
            `
            INSERT INTO driveunit_model (ModelID, DriveUnitID) VALUES ('${req.body.modelId}', '${req.body.driveUnitId}');
            `)
            return res.json(driveUnitId);
    };

    async addTranssmissionsInDataBase(req, res, next) {
        const [transmissionId, metadata] = await db.query(
            `
            INSERT INTO transsmissions (TranssmissionsName) VALUES ('${req.body.transsmissionsValue}');
            `)
            return res.json(transmissionId)
    };

    async addTranssmissionByModel(req, res, next){
        const [driveUnitId, metadata] = await db.query(
            `
            INSERT INTO transsmission_model (ModelID, TranssmissionID) VALUES ('${req.body.modelId}', '${req.body.transsmissionsId}');
            `)
            return res.json(driveUnitId);
    };

    async addGenerationByModelId(req, res, next){
        const [generation, metadata] = await db.query(
            `
            INSERT INTO generation (GenerationName, GenerationAge, ModelID) VALUES ('${req.body.generationName}', '${req.body.generationAge}', '${req.body.modelId}');
            `)
            return res.json(generation)
    }

    async addBody(req, res, next) {
        const [body, metadata] = await db.query(
            `
            INSERT INTO bodytypes (BodyName) VALUES ('${req.body.bodyName}');
            `)
            return res.json(body)
    };

    async addColorDatabase(req, res, next) {
        const [colorId, metadata] = await db.query(
            `
            INSERT INTO colors_car (ColorName) VALUES ('${req.body.colorName}');
            `)
            return res.json(colorId)
    };

    async addCityDatabase(req, res, next) {
        const [cityId, metadata] = await db.query(
            `
            INSERT INTO cities (CityName) VALUES ('${req.body.cityName}');
            `)
            return res.json(cityId)
    };

    async addBodyByModel(req, res, next) {
        const [bodyAndModel, metadata] = await db.query(
            `INSERT INTO modelandbody (ModelID, BodyID) VALUES ('${req.body.modelId}', '${req.body.bodyId}');`
        );
        return res.json(bodyAndModel)
    }

    async getAllBrands(req, res, next){
        const allBrands = await brand.findAll();
        return res.json(allBrands);
    }

    async getAllBody(req, res, next){
        const [body, metadata] = await db.query(
            `SELECT * FROM bodytypes;
            `)
            return res.json(body)
    }

    async getModelsByBrand (req, res, next) {
        const [brands, metadata] = await db.query(
            `select models.ModelID, models.ModelName
            from models
            inner join brand on models.BrandID = brand.BrandID
            where brand.BrandName = '${req.params.brand}'`)
            return res.json(brands)
    };

    async getBodyByBrand (req, res, next) {
        const [body, metadata] = await db.query(
            `SELECT DISTINCT modelandbody.id, bodytypes.BodyName
            FROM cars
            inner join modelandbody on modelandbody.id = cars.BodyID
            inner join models on modelandbody.ModelID = models.ModelID
            inner join bodytypes on modelandbody.BodyID = bodytypes.BodyID
            inner join brand on models.BrandID = brand.BrandID
            where BrandName = '${req.params.brand}'`)
            return res.json(body)
    };

    async getBodyByModel (req, res, next) {
        const [body, metadata] = await db.query(
            `SELECT DISTINCT modelandbody.id, bodytypes.BodyName
            FROM modelandbody
            inner join models on modelandbody.ModelID = models.ModelID
            inner join bodytypes on modelandbody.BodyID = bodytypes.BodyID
            where models.ModelName = '${req.params.models}'`)
            return res.json(body)
    };

    async getTranssmissionByBrand (req, res, next) {
        const [transsmission, metadata] = await db.query(
            `SELECT DISTINCT transsmissions.TransID, transsmissions.TranssmissionsName
            FROM transsmission_model
            inner join models on transsmission_model.ModelID = models.ModelID
            inner join transsmissions on transsmission_model.TranssmissionID = transsmissions.TransID
            inner join brand on models.BrandID = brand.BrandID
            where brand.BrandName = '${req.params.brand}'`)
            return res.json(transsmission)
    };

    async getTranssmissionByModel (req, res, next) {
        const [transsmission, metadata] = await db.query(
            `SELECT transsmission_model.id, transsmissions.TranssmissionsName
            FROM transsmission_model
            inner join models on transsmission_model.ModelID = models.ModelID
            inner join transsmissions on transsmission_model.TranssmissionID = transsmissions.TransID
            where models.Modelname = '${req.params.model}'`)
            return res.json(transsmission)
    };

    async getGenerationByModel (req, res, next) {
        const [generation, metadata] = await db.query(
            `select generation.GenerationID, generation.GenerationName, generation.GenerationAge
            from generation
            inner join models on generation.ModelID = models.ModelID
            where models.ModelName = '${req.params.model}'`)
            return res.json(generation)
    };

    async getAllColors (req, res, next) {
        const [colors, metadata] = await db.query(
            `select colors_car.ColorID, colors_car.ColorName
            from colors_car`)
            return res.json(colors)
    };

    async getAllEgineTypes (req, res, next) {
        const [egineTypes, metadata] = await db.query(
            `select EngineID, EnginTypeName
            from enginetypes`)
            return res.json(egineTypes)
    };

    async getDriveUnitModel (req, res, next) {
        const [driveUnit, metadata] = await db.query(
            `select driveunit_model.id, driveunit.DriveUnitName
            from driveunit_model
            inner join models on driveunit_model.ModelID = models.ModelID
            inner join driveunit on driveunit_model.DriveUnitID = driveunit.id
            where models.Modelname = '${req.params.model}';`)
            return res.json(driveUnit)
    }

    async getAllDriveUnit (req, res, next) {
        const [driveUnit, metadata] = await db.query(
            `SELECT * FROM db_cars.driveunit;`)
            return res.json(driveUnit)
    }

    async getAllCities (req, res, next) {
        const [cities, metadata] = await db.query(
            `SELECT * FROM db_cars.cities;`)
            return res.json(cities)
    }

    async getAllTransmissions (req, res, next) {
        const [transsmissionId, metadata] = await db.query(
            `SELECT * FROM db_cars.transsmissions;`)
            return res.json(transsmissionId)
    }
}



export default new InputController();