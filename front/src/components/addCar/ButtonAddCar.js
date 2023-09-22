import React, { useState, useContext } from "react";
import CarsServices from "../../services/CarsServices";
import { useNavigate } from "react-router-dom";
import ModalError from "../ModalWindows/ModalError";
import ModalSucces from "../ModalWindows/ModalSuccess";
import {MAIN_ROUTE} from "../../utils/consts";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";


const ButtonAddCar = observer((props) => {

    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [textError, setTextError] = useState('');
    const [modalErrorActive, setModalErrorActive] = useState(false);
    const [modalSuccesActive, setModalSuccesActive] = useState(false)

    const translationKeys = {
        'Vin': 'VIN',
        'brandId': 'Бренд автомобиля',
        'modelId': 'Модель автомобиля',
        'generation': 'Поколение автомобиля',
        'bodyId': 'Кузов автомобиля',
        'engineId': 'Тип двигателя',
        'driveUnitId': 'Привод автомобиля',
        'transsmissionId': 'Трансмиссию автомбиля',
        'rule': 'Положения руля автомобиля',
        'colorId': 'Цвет автомобиля',
        'volume': 'Объем двигателя',
        'powerEngine': 'Мощьность двигателя',
        'millageValue': 'Пробег автомобиля',
        'ageValue': 'Год выпуска',
        'priceValue': 'Цену',
        'phoneValue': 'Телефон',
        'cityId': 'Город',
        'filesImages': 'Фотографии автомобиля',
        'filesDocument': 'Документы на автомобиль'}

    const clickHendler = () => {
        for(let key in props.dataSet){
            try {
                if ((props.dataSet[key] === null) || (props.dataSet[key].length === 0)){
                    setTextError("Вы не указали поле " + translationKeys[key]);
                    setModalErrorActive(true)
                    return
                }
            } catch(e){
                console.log(e);
                return
            }
        } 

        const params = new FormData();
        params.append('VIN', props.dataSet.Vin);
        params.append('BrandID', props.dataSet.brandId);
        params.append('ModelID', props.dataSet.modelId);
        params.append('generation', props.dataSet.generation);
        params.append('BodyID', props.dataSet.bodyId);
        params.append('EnginTypeID', props.dataSet.engineId);
        params.append('DriveUnitID', props.dataSet.driveUnitId);
        params.append('TranssmissnionTypeID', props.dataSet.transsmissionId);
        params.append('rule', props.dataSet.rule);
        params.append('ColorCarID', props.dataSet.colorId);
        params.append('VolumeEngine', props.dataSet.volume);
        params.append('EnginePower', props.dataSet.powerEngine);
        params.append('Mileage', props.dataSet.millageValue);
        params.append('Age', props.dataSet.ageValue);
        params.append('Customs', props.dataSet.customsId);
        params.append('QtyPerson', props.dataSet.persons);
        params.append('PTS', props.dataSet.selectedOption);
        params.append('State', props.dataSet.isDeffectId);
        params.append('Price', props.dataSet.priceValue);
        params.append('DescriptionCar', props.dataSet.descriptionCar);
        params.append('Phone', props.dataSet.phoneValue);
        params.append('City', props.dataSet.cityId);
        params.append('UserId', user.userId);

        if (props.dataSet.filesImages.length != 0){
            for (let i = 0; i < props.dataSet.filesImages.length; i++) {
                params.append('files', props.dataSet.filesImages[i]);
            }
            params.append('imagesCar', props.dataSet.filesImages[0]);
        } 

        if (props.dataSet.filesDocument.length != 0){
            for (let i = 0; i < props.dataSet.filesDocument.length; i++) {
                params.append('documents', props.dataSet.filesDocument[i]);
            }
        }
        setModalSuccesActive(true);
        CarsServices.addCar(params);
        navigate(MAIN_ROUTE);
    }
    
    return (
        <section className="send-data car__section">
            <div className="send-data__box">
                <button className="send-data__btn" onClick={() =>{clickHendler()}}>Разместить</button>
            </div>
            <ModalError active={modalErrorActive} setActive={setModalErrorActive} textError={textError}/>
            <ModalSucces active={modalSuccesActive} setActive={setModalSuccesActive} textSucces={'Автомобиль успешно добавлен'}/>
        </section>
    )
});

export default ButtonAddCar;