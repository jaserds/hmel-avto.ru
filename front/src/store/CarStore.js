import {makeAutoObservable} from "mobx";


export default class CarStore{
    constructor(){
        this._cars = []
        this._searchCars = []
        makeAutoObservable(this)
    }

    setCars(cars){
        this._cars = cars;
    }

    setSearchCars(cars){
        this._searchCars = cars
    }

    AddSearchCars(cars){
        const newData = [...this._searchCars, ...cars]
        this._searchCars = newData
    }

    get cars(){
        return this._cars;
    }

    get searchCars(){
        return this._searchCars;
    }
}