import React, { useEffect, useState } from "react";
import AdminPanelServices from "../../../services/AdminPanelServices";
import { Link } from "react-router-dom";
import { CAR_DETAILS_ROUTE } from "../../../utils/consts";
import userLogo from "./img/user1.png"



const CarItem = (props) => {

    const [photoName, setPhotoName] = useState('');
    const [totalSumm, setTotalSumm] = useState(null)

    const fatchPhoto = async () => {
        const result = await AdminPanelServices.getPhotoPreviewByIDCarsForAdminPanel(props.carData.carID)
        setPhotoName(result.data.fileName)
    }

    const fatchTotalSumm = async () => {
        await AdminPanelServices.getTotalExpenses(props.carData.carID).then((data) => setTotalSumm(data.data[0].TotalExpenses))
    }

    useEffect(() => {
        fatchTotalSumm()
        console.log(totalSumm);
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
                <Link to={CAR_DETAILS_ROUTE + "/" + props.carData.carID} className="car-item__car-name">{props.carData.BrandName} {props.carData.ModelName} {props.carData.GenerationName} ({props.carData.GenerationAge} г.)</Link>
            </div>
            <div className="car-item__car-price-site-box">Цена на сайте: <span className="car-price-site">{props.carData.Price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> </div>
            <div className="car-item__car-price-expenses-box">Расходы: <span className="car-price-expenses">{Number(totalSumm).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0})}
            {/* <span className="car-price-expenses-sup-sell">+ 28 500 р.</span> */}
            </span></div>
            <div className="car-item__about-car">{props.carData.isSite === 1 ? "Размещен на сайте" : "Снят с продажи"}</div>
            <div className="car-item__user-box">
                <div className="car-item__user-img-box">
                    <img className="car-item__user-img" src={userLogo}/>
                </div>
                <div className="car-item__user-fio">{getUserName(props.carData.fio)}</div>
            </div>
        </div>
    )
}

export default CarItem;