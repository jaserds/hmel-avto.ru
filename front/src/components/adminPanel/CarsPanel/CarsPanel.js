import React, { useEffect, useState } from "react";
import CarItem from "./CarItem";
import AdminPanelServices from "../../../services/AdminPanelServices";

const CarsPanel = (props) => {

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
    
    
    return(
        <div className="admin__information-container">
            <div className="information-container__title-box">
                <h1 className="information-container__title">Автомобили</h1>
                <input className="information-container__search" type="text" placeholder="Введите нимаенование автомобиля или id " />
            </div>
            <div className="information-container__content">
                {allCars.map((car, index) => {return (<CarItem key={index} carData={car}/>)})} 
            </div>
        </div>
    )
}

export default CarsPanel;