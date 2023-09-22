import $api from "../http/index"


export default class AuthServices{
    static async login(email, password) {
        return $api.post('/api/user/login', {email, password})
    }

    static async loginManager(email, password, role) {
        return $api.post('/api/user/loginManager', {email, password, role})
    }

    static async registration(fio, phone, email, password, role) {
        return $api.post('/api/user/register', {fio, phone, email, password, role})
    }

    static async registrationManager(fio, phone, email, password, inn, organizationName, jobeTitle, role) {
        return $api.post('/api/user/register-manager', {fio, phone, email, password, inn, organizationName, jobeTitle, role})
    }

    static async logout() {
        return $api.post('/api/user/logout')
    }
}
