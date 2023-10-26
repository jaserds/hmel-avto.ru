import $api from "../http/index"


export default class AdminPanelServices{

    static async getAllCarsForAdminPanel() {
        return $api.get('/api/panel/get-all-car')
    }

    static async getPhotoPreviewByIDCarsForAdminPanel(carID) {
        return $api.get('/api/panel/get-photo-preview', {params: {carID}})
    }

    static async getExpensesByCarID(carID) {
        return $api.get('/api/panel/get-expenses', {params: {carID}})
    }

    static async getTotalExpenses(carID) {
        return $api.get('/api/panel/get-total-expenses', {params: {carID}})
    }

    static async addPhotos(photosCar){
        const {data} = await $api.post('api/panel/add-photos-car', photosCar)
        return data
    }

    static async addDocuments(documentsCar){
        const {data} = await $api.post('api/panel/add-documents-car', documentsCar)
        return data
    }

    static async addExpensesByCarID(expensesName, expensesDataTime, expensesSumm, carID){
        const {data} = await $api.post('api/panel/add-expenses', {expensesName, expensesDataTime, expensesSumm, carID})
        return data
    }

    static async updateDescriptionCar(description, carID){
        const {data} = await $api.post('api/panel/update-description-car', {'description' : description, 'carID': carID})
        return data
    }

    static async updateCharacteristics(characteristics, carID) {
        const {data} = await $api.post('api/panel/update-characteristics-car', {'characteristics' : characteristics, 'carID': carID})
        return data
    } 

    static async deleteAuto(carID){
        const {data} = await $api.post('api/panel/del-auto', {carID})
        return data
    }

    static async restoreAuto(carID){
        const {data} = await $api.post('api/panel/restore-auto', {carID})
        return data
    }

    static async delPhotoByID(photoID) {
        return $api.delete(`api/panel/delete-photo/${photoID}`)
    }

    static async delExpensesByID(expensesID) {
        return $api.delete(`api/panel/delete-expenses`, {params: {expensesID}})
    }

    static async delDocumentByID(documentID) {
        return $api.delete(`api/panel/delete-document/${documentID}`)
    }    
    
}
