import React from "react";
import { CARPAGE_ROUTE } from "../../utils/consts";
import { NavLink } from "react-router-dom";


const RecomendationItem = ({cars}) => {
    return (
        <div className="recommendations__item">
            <div className="recommendations__item-link">
                <div className="recommendations-item__wrapper-image">
                    <div className="recommendations-item__image-box">
                        <NavLink to={CARPAGE_ROUTE + "/" + cars.carID} target="_blank">
                            <img src={"/images/" + cars.image[0].fileName} alt="" className="recommendations-item-image" />
                        </NavLink>
                    </div>
                </div>
                <div className="recommendations__price">{cars.Price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                <div className="recommendations__item-title">{cars.brandName} {cars.ModelName} - {cars.GenerationName} {cars.Age}</div>
                <div className="recommendations__milage">{cars.Age} / {cars.Mileage} км</div>
            </div>
        </div>
    );
};

export default RecomendationItem;