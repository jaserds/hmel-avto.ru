import {makeAutoObservable} from "mobx";
import AuthServices from "../services/AuthServices";
import axios from "axios";


export default class UserStore{
    _isAuth = false;
    _user = {}
    _isLoading = false
    constructor(){
        
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }
    setIsUser(user){
        this._user = user;
    }

    get isAuth(){
        return this._isAuth;
    }

    get userName(){
        if (this.isUser.fio !== undefined){
            if (this.isUser.fio.trim().length > 0){
                let userFio = this.isUser.fio.split(' ');
                let formattedName = userFio[0];
                for (let i = 1; i < userFio.length; i++) {
                    formattedName += ` ${userFio[i][0]}.`;
                  }
                return formattedName
            }
        }else{
            return this.isUser.fio
        }
    }
    
    get userRole(){
        return this.isUser.role
    }

    get isUser(){
        return this._user
    }

    get userId(){
        return this.isUser.id;
    }

    async login(email, password){
        try {
            const responce = await AuthServices.login(email, password)
            localStorage.setItem('token', responce.data.userData.accessToken)
            this.setIsAuth(true)
            this.setIsUser(responce.data.userData.userDto)
            return responce
        } catch (e) {
           return e.response?.data;
        }
    }

    async loginManager(email, password, role){
        try {
            const responce = await AuthServices.loginManager(email, password, role)
            localStorage.setItem('token', responce.data.userData.accessToken)
            this.setIsAuth(true)
            this.setIsUser(responce.data.userData.userDto)
            return responce
        } catch (e) {
           return e.response?.data;
        }
    }

    async registration(fio, phone, email, password, role){
        try {
            const responce = await AuthServices.registration(fio, phone, email, password, role);
            localStorage.setItem('token', responce.data.userData.accessToken)
            this.setIsAuth(true)
            this.setIsUser(responce.data.userData.userDto)
            return responce
        } catch (e) {
            return e.response?.data?.message;
        }
    }

    async registrationManager(fio, phone, email, password, inn, organizationName, jobeTitle, role){
        try {
            const responce = await AuthServices.registrationManager(fio, phone, email, password, inn, organizationName, jobeTitle, role);
            localStorage.setItem('token', responce.data.userData.accessToken)
            this.setIsAuth(true)
            this.setIsUser(responce.data.userData.userDto)
            return responce
        } catch (e) {
            return e.response?.data?.message;
        }
    }

    async logout(){
        try {
            const responce = await AuthServices.logout();
            localStorage.removeItem('token')
            this.setIsAuth(false)
            this.setIsUser({})
        } catch (e) {
            return e.response?.data?.message;
        }
    }

    async checkAuth() {
        try {
            const responce = await axios.get('/api/user/refresh', { withCredentials: true, baseURL: 'https://hmel-avto.ru/' }) 
            localStorage.setItem('token', responce.data.accessToken);
            this.setIsAuth(true);
            this.setIsUser(responce.data.user);
            return responce
        } catch (e) {
            return e.response?.data;
        } 
    }
}