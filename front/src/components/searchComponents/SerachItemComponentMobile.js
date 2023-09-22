import React, { useEffect, useState } from "react";
import CarsServices from "../../services/CarsServices";
import { NavLink } from "react-router-dom";
import { CARPAGE_ROUTE } from "../../utils/consts";
import prodNominImg from "./product.noimage.png"

const SerachItemComponentMobile = (props) => {
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const fetchDataPhoto = async () => {
          const responce = await CarsServices.getAllPhotoByCarId(props.dataCar.carID);
          setPhotos(responce.data)
        }
        fetchDataPhoto()
      }, [])
    
      const getPhoto = (index) => {
        if (photos[index] !== undefined && photos !== []) {
          return photos[index].url + photos[index].fileName
        }
        else {
          return {prodNominImg}
        }
      }

  return (
    <NavLink to={CARPAGE_ROUTE + `/${props.dataCar.carID}`} target="_blank">
      <div className="search-result__item-mobile">
        <div className="search-result__item-mobile-wrapper">
          <div className="item-mobile__left-box">
            <div className="item-mobile__image-box">
              <NavLink to={CARPAGE_ROUTE + `/${props.dataCar.carID}`} target="_blank">
                <img src={getPhoto(0)} alt="" className="item-mobile__image" />
              </NavLink>
            </div>
            <div className="item-mobile__pice">
              {props.dataCar.Price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="item-mobile__rigth-box">
            <div className="item-mobile__description">
              <p className="item-mobile__title">{`${props.dataCar.BrandName} ${props.dataCar.ModelName} ${props.dataCar.GenerationName}`}</p>
              <ul className="item-mobile__description-list">
                <li className="item-mobile__description-item">{props.dataCar.BodyName}</li>
                <li className="item-mobile__description-item">{props.dataCar.TranssmissionsName}</li>
                <li className="item-mobile__description-item">{props.dataCar.VolumeEngine} л. / {props.dataCar.EnginePower} лс.</li>
                <li className="item-mobile__description-item">{props.dataCar.EnginTypeName}</li>
                <li className="item-mobile__description-item">{props.dataCar.ColorName}</li>
                <li className="item-mobile__description-item">{props.dataCar.DriveUnitName}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item-mobile__bottom-box">
          <div className="item-mobile__city">{props.dataCar.CityName}</div>
          <div className="item-mobile__age-and-millage">
            <div className="item-mobile__age">{props.dataCar.Age} год</div>
            <div className="item-mobile__maillage">{props.dataCar.Mileage.toLocaleString()} км</div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default SerachItemComponentMobile;