import $api from "../http/index"


export default class InputServices{
    static async getAllBrands() {
        return $api.get('/api/input/brands')
    }

    static async getAllBody(){
        return $api.get(`/api/input/all/body`)
    }

    static async getAllTranssmissions() {
        return $api.get('/api/input/all/transmissions')
    }   
    
    static async getAllDriveUnit() {
        return $api.get(`/api/input/driveUnit`)
    }

    static async getAllEgineTypes() {
        return $api.get(`/api/input/egineTypes`)
    }

    static async getBodyByBrand(brand) {
        return $api.get(`/api/input/body/${brand}`)
    }

    static async getBodyByModel(brand, model) {
        return $api.get(`/api/input/body/${brand}/${model}`)
    }

    static async getModelsByBrand(brand) {
        return $api.get(`/api/input/models/${brand}`)
    }

    static async getGenerationByModel(brand, model) {
        return $api.get(`/api/input/${brand}/${model}`)
    }

    static async getTranssmissionByBrand(brand) {
        return $api.get(`/api/input/transsmission/${brand}`)
    }

    static async getTranssmissionByModel(brand, model) {
        return $api.get(`/api/input/transsmission/${brand}/${model}`)
    }

    static async getDriveUnitModel(model) {
        return $api.get(`/api/input/driveUnit/${model}`)
    }

    static async getAllColors() {
        return $api.get(`/api/input/colors`)
    }

    static async getSearchCars(para, limit = 5, page = 1) {
        return $api.get(`/api/car/search?${para}`, {params: {limit, page}})
    }
    
    static async getAllCities() {
        return $api.get(`/api/input/all/city`)
    }

    static async addInputItemInDataBase(itemId, itemValue){
        return $api.post(`/api/input/add-item`, {itemId, itemValue})
    }

    static async addBrandInDataBase(brandValue){
        return $api.post('/api/input/add-brand', {brandValue})
    }

    static async addDriveUnitInDataBase(driveUnitValue){
        return $api.post('/api/input/add/new-drive-unit', {driveUnitValue})
    }

    static async addTranssmissionsInDataBase(transsmissionsValue){
        return $api.post('/api/input/add/new-transsmissions', {transsmissionsValue})
    }

    static async addBrandInDataBase(bodyName){
        return $api.post('/api/input/add/body', {bodyName})
    }

    static async addBodyByModel(modelId, bodyId){
        return $api.post('/api/input/add/models-body', {modelId, bodyId})
    }

    static async addDriveUnitByModel(modelId, driveUnitId){
        return $api.post('/api/input/add/drive-unit', {modelId, driveUnitId})
    }

    static async addTranssmissionByModel(modelId, transsmissionsId){
        return $api.post('/api/input/add/transmission-by-model', {modelId, transsmissionsId})
    }

    static async addBrand(brandName){
        return $api.post('/api/input/add/brand', {brandName})
    }

    static async addModelByBrandId(modelName, brandId){
        return $api.post('/api/input/add/model-by-brand', {modelName, brandId})
    }

    static async addGenerationByModelId(generationName, generationAge, modelId){
        return $api.post('/api/input/add/generation-by-mode-id', {generationName, generationAge, modelId})
    }

    static async addColorDatabase(colorName){
        return $api.post('/api/input/add/color', {colorName})
    }

    static async addCityDatabase(cityName){
        return $api.post('/api/input/add/city', {cityName})
    }

}