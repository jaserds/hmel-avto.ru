import React, { useState } from "react";
import CarsPanel from "./CarsPanel/CarsPanel";
import HmelAvtoLogo from './CarsPanel/img/logo-hmel-avto.svg';
import carIcon from './CarsPanel/img/car-menu-icon.svg';
import userIcon from './CarsPanel/img/user-menu-icon.svg';
import optionsIcon from './CarsPanel/img/options-menu-icon.svg';
import homeIcon from './CarsPanel/img/home.svg';
import {MAIN_ROUTE } from '../../utils/consts';
import {NavLink} from 'react-router-dom';
import "./CarsPanel/css/carPanel.css";

const AdminPanel = () => {

    const [isClickItemMenu, setIsClickItemMenu] = useState({"avto": true, "users": false, "options": false})

    return (
        <section className="main__section">
            <div className="admin-panel__left-container">
                <img className="left-container__logo" src={HmelAvtoLogo} alt="Логотип компании hmel-avto"/>
                <div className="left-container__menu-block" onClick={() => setIsClickItemMenu({"avto": true, "users": false, "options": false})}>
                    <img src={carIcon} alt="Иконка автомобили" className="left-container__img"/>
                    <p className="left-container__text-menu">Автомобили</p>
                </div>
                {/* <div className="left-container__menu-block" onClick={() => setIsClickItemMenu({"avto": false, "users": true, "options": false})}>
                    <img src={userIcon} alt="Иконка пользователи" className="left-container__img"/>
                    <p className="left-container__text-menu">Пользователи</p>
                </div>
                <div className="left-container__menu-block" onClick={() => setIsClickItemMenu({"avto": false, "users": false, "options": true})}>
                    <img src={optionsIcon} alt="Иконка настройки" className="left-container__img"/>
                    <p className="left-container__text-menu">Настройки</p>
                </div> */}
                <div className="left-container__menu-block left-container__menu-block_bottom">
                <NavLink className="left-container__menu-block-link" to={MAIN_ROUTE}>
                    <img src={homeIcon} alt="Иконка выход на главную страницу" className="left-container__img"/>
                    <p className="left-container__text-menu">Главаня</p>
                </NavLink>
                </div>
            </div>
            {isClickItemMenu.avto === true && <CarsPanel/>}
            
        </section>
    )
}

export default AdminPanel;