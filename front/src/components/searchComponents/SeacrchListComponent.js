import React, { useContext, useState, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import SearchItemComponent from "./SearchItemComponent";
import SerachItemComponentMobile from "./SerachItemComponentMobile";
import carWheel from "./car-wheel.png";


const SearchListComponent = observer(({loading, setIsFatch}) => {

    const {cars} = useContext(Context);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const element = document.getElementById('searchResultElements');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
          };
      
          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize);
          };

      }, []);

    const showMoreHandl = () => {
        setIsFatch(true)
    }

    return (
        <div id="searchResultElements" className="search-result-items">
            { windowWidth <= 768 ?
                cars.searchCars.map((itemSearch, index) => {return(<SerachItemComponentMobile key={index} dataCar={itemSearch} />)})
                :
                cars.searchCars.map((itemSearch, index) => {return(<SearchItemComponent key={index} dataCar={itemSearch} />)})
            }
            <div className="serach-result__show-more-btn-box">
                <button className="serach-result__show-more-btn active_spinner" 
                onClick={() => {showMoreHandl()}}>{ loading ? <div className="spinner"><img src={carWheel} /></div> : "Показать больше автомобилей"}</button>
            </div>
        </div>
    )
});

export default SearchListComponent;