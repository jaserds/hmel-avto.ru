import $api from "../http/index"


export default class AdminPanelServices{

    static async getAllCarsForAdminPanel() {
        return $api.get('/api/panel/get-all-car')
    }

    static async getPhotoPreviewByIDCarsForAdminPanel(carID) {
        return $api.get('/api/panel/get-photo-preview', {params: {carID}})
    }

    

}
