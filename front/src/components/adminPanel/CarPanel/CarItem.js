import React, { useEffect, useState } from "react";
import './css/carPanel.css';
import AdminPanelServices from "../../../services/AdminPanelServices";



const CarItem = (props) => {

    const [photoName, setPhotoName] = useState('');

    const fatchPhoto = async () => {
        const result = await AdminPanelServices.getPhotoPreviewByIDCarsForAdminPanel(props.carData.carID)
        setPhotoName(result.data.fileName)
    }

    useEffect(() => {
        fatchPhoto()
    }, [])

    const getUserName = (userName) => {
        if (userName != undefined){
            if (userName.trim().length > 0){
                let userFio = userName.split(' ');
                let formattedName = userFio[0];
                for (let i = 1; i < userFio.length; i++) {
                    formattedName += ` ${userFio[i][0]}.`;
                  }
                return formattedName
            }
        }else{
            return userName
        }
    }

    return (
        <div className="information-container__car-item">
            <img className="car-item__img" src={"https://hmel-avto.ru/images/" + photoName}/>
            <div className="car-item__data-car-box">
                <p className="car-item__car-id">{props.carData.carID}:</p>
                <p className="car-item__car-name">{props.carData.BrandName} {props.carData.ModelName} {props.carData.GenerationName} ({props.carData.GenerationAge} г.)</p>
            </div>
            <div className="car-item__car-price-site-box">Цена на сайте: <span className="car-price-site">{props.carData.Price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> </div>
            <div className="car-item__car-price-expenses-box">Расходы: <span className="car-price-expenses">{props.carData.Expenses.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })}<span className="car-price-expenses-sup-sell">+ 28 500 р.</span></span></div>
            <div className="car-item__about-car">{props.carData.isSite === 1 ? "Размещен на сайте" : "Снят с продажи"}</div>
            <div className="car-item__user-box">
                <div className="car-item__user-img-box">
                    <img className="car-item__user-img" src="./camry-1-3.jpg"/>
                </div>
                <div className="car-item__user-fio">{getUserName(props.carData.fio)}</div>
            </div>
        </div>
    )
}

export default CarItem;