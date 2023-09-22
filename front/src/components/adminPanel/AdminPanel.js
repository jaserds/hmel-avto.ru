import React, { useEffect, useState} from "react";
import CarItem from './CarPanel/CarItem';
import HmelAvtoLogo from './CarPanel/img/logo-hmel-avto.svg';
import carIcon from './CarPanel/img/car-menu-icon.svg';
import userIcon from './CarPanel/img/user-menu-icon.svg';
import optionsIcon from './CarPanel/img/options-menu-icon.svg';
import homeIcon from './CarPanel/img/home.svg';
import { MAIN_ROUTE } from '../../utils/consts';
import {NavLink} from 'react-router-dom';
import AdminPanelServices from "../../services/AdminPanelServices";

const AdminPanel = () => {

    const [allCars, setAllCars] = useState([]);

    const fetchDataAllCarsFromAdminPanel = async (method, element, params) => {
        if (params === undefined) {
            const result = await method();
            element(result.data);
        } else {
            const result = await method(...params);
            element(result.data);
        }
      }

    useEffect(() => {
        fetchDataAllCarsFromAdminPanel(AdminPanelServices.getAllCarsForAdminPanel, setAllCars);
    }, [])

    return (
        <section className="main__section">
            <div className="admin-panel__left-container">
                <img className="left-container__logo" src={HmelAvtoLogo} alt="Логотип компании hmel-avto"/>
                <div className="left-container__menu-block">
                    <img src={carIcon} alt="Иконка автомобили" className="left-container__img"/>
                    <p className="left-container__text-menu">Автомобили</p>
                </div>
                <div className="left-container__menu-block">
                    <img src={userIcon} alt="Иконка пользователи" className="left-container__img"/>
                    <p className="left-container__text-menu">Пользователи</p>
                </div>
                <div className="left-container__menu-block">
                    <img src={optionsIcon} alt="Иконка настройки" className="left-container__img"/>
                    <p className="left-container__text-menu">Настройки</p>
                </div>
                <div className="left-container__menu-block left-container__menu-block_bottom">
                <NavLink className="left-container__menu-block-link" to={MAIN_ROUTE}>
                    <img src={homeIcon} alt="Иконка выход на главную страницу" className="left-container__img"/>
                    <p className="left-container__text-menu">Главаня</p>
                </NavLink>
                </div>
            </div>
            <div className="admin__information-container">
                <div className="information-container__title-box">
                    <h1 className="information-container__title">Автомобили</h1>
                    <input className="information-container__search" type="text" placeholder="Введите нимаенование автомобиля или id " />
                </div>
                <div className="information-container__content">
                    {allCars.map((car, index) => {return (<CarItem key={index} carData={car} />)})} 
                </div>
            </div>
        </section>
    )
}

export default AdminPanel;