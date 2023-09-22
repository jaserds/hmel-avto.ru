import $api from "../http/index"


export default class CarsServices{
    static async getPhotoCarByCarId(carID) {
        return $api.get(`/api/car/photo/${carID}`)
    }

    static async getAllRecomendationsCars(limit = 5, page = 1){
        const {data} = await $api.get('api/car/all/recomendations-cars', {params: {limit, page}})
        return data
    }

    static async addCar(dataCar){
        const {data} = await $api.post('api/car/addCar', dataCar)
        return data
    }

    static async getAllPhotoByCarId(carId) {
        return $api.get(`/api/car/photo/all/${carId}`)
    }

    static async getAllDocumentsByCarId(carId) {
        return $api.get(`/api/car/documents/all/${carId}`)
    }

    static async getCarByCarId(carId) {
        return $api.get(`/api/car/${carId}`)
    }
    
    static async deletePhotoCar() {
        return $api.delete(`/api/car/delete/images`)
    }

    static async getSimilarCars(dataSimilarCars){
        const {data} = await $api.get('api/car/similar-cars',  {params: {dataSimilarCars}})
        return data
    }
}