import React, { useEffect, useState } from "react";
import RecomendationItem from "./RecomendationItem";
import CarsServices from "../../services/CarsServices";
import carWheel from "./car-wheel.png"

const RecpmendationListCars = () => {
    const [saveCars, setSaveCars] = useState([])
    const [page, setPage] = useState(1)
    const [isFetch, setIsFatch] = useState(true);
    const [loading, setLoading] = useState(true);

        
    useEffect(()=>{
        if (isFetch){
            setLoading(true)
            CarsServices.getAllRecomendationsCars(16, page).then(data => {
                setSaveCars((prevItems) => [...prevItems, ...data])
                setPage(page+1)
                setLoading(false)
            }).finally(() => {setIsFatch(false)})
        }
    }, [isFetch])

    const showMoreHandl = () => {
        setIsFatch(true)
    }



    return (
        <section className="recommendations">
            <div className="container">
                <h2 className="recommendations__title">Рекомендуем</h2>
                <div className="recommendations__grid">
                    {saveCars.map((car) => {
                        return(<RecomendationItem key={car.carID} cars={car} />)
                    })}
                </div>
                <button className="recommendations__show-more active_spinner" onClick={() => {showMoreHandl()}}>{ loading ? <div className="spinner"><img src={carWheel} /></div> : "Показать еще"}</button>
            </div>
        </section>
    );
};

export default RecpmendationListCars