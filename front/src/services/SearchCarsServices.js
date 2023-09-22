import $api from "../http/index"


export default class SearchCarsServices{
    static async getSearchCars(params, limit = 5, page = 1) {
        return $api.get(`/api/car/search-cars?${params}`, {params: {limit, page}})
    }
}