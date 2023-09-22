import {makeAutoObservable} from "mobx";


export default class InputStore{

    _barnd = '';
    _model = '';
    _generation = '';
    _body = '';
    _transsmission = '';
    _engine = '';
    _driveUnit = '';
    _volumeStart = '';
    _volumeEnd = '';
    _ageStart = '';
    _ageEnd = '';
    _priceStart = '';
    _priceEnd = '';

    constructor(){
        makeAutoObservable(this)
    }

    setBrand(brand){
        this._barnd = brand;
    }

    setModel(model){
        this._model = model;
    }

    setGeneration(generation){
        this._generation = generation;
    }

    setBody(body){
        this._body = body;
    }

    setTranssmission(transsmission){
        this._transsmission = transsmission ;
    }

    setEngine(engine){
        this._engine = engine;
    }

    setDriveUnit(driveUnit){
        this._driveUnit = driveUnit;
    }

    setVolumeStart(volumeStart){
        this._volumeStart = volumeStart;
    }

    setVolumeEnd(volumeEnd){
        this._volumeEnd = volumeEnd ;
    }

    setAgeStart(ageStart){
        this._ageStart = ageStart;
    }

    setAgeEnd(ageEnd){
        this._ageEnd = ageEnd;
    }

    setPriceStart(priceStart){
        this._priceStart = priceStart;
    }

    setPriceEnd(priceEnd){
        this._priceEnd = priceEnd;
    }
    

    get brand(){
        return this._barnd;
    }

    get model(){
        return this._model;
    }

    get generation(){
        return this._generation;
    }

    get transsmission(){
        return this._transsmission;
    }

    get engine(){
        return this._engine;
    }

    get driveUnit(){
        return this._driveUnit;
    }

    get volumeStart(){
        return this._volumeStart;
    }

    get volumeEnd(){
        return this._volumeEnd;
    }

    get ageStart(){
        return this._ageStart;
    }

    get ageEnd(){
        return this._ageEnd;
    }

    get priceStart(){
        return this._priceStart;
    }

    get priceEnd(){
        return this._priceEnd;
    }
}