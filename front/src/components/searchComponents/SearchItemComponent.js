import React, { useEffect, useState } from "react";
import CarsServices from "../../services/CarsServices";
import { NavLink } from "react-router-dom";
import { CARPAGE_ROUTE } from "../../utils/consts";
import prodNominaImg from "./product.noimage.png"

const SearchItemComponent = (props) => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const fetchDataPhoto = async () => {
      const responce = await CarsServices.getAllPhotoByCarId(props.dataCar.carID);
      setPhotos(responce.data)
    }
    fetchDataPhoto()
  }, [])

  const getPhoto = (index) => {
    if (photos[index] !== undefined && photos.length !== 0) {
      return photos[index].url + photos[index].fileName
    }
    else {
      return {prodNominaImg}
    }
  }

  return (
    <div className="search-result-item">
      <div className="search-result-item-image-wrapper">
        <div className="search-result-item__imge-top-box">
          <NavLink to={CARPAGE_ROUTE + `/${props.dataCar.carID}`} target="_blank" className="search-result-item__imge-link">
            <img src={getPhoto(0)} alt="" className="search-result-item__imge-top" />
          </NavLink>
        </div>
        <div className="search-result-item__imge-box">
          <NavLink to={CARPAGE_ROUTE + `/${props.dataCar.carID}`} target="_blank" className="search-result-item__imge-link">
            <img src={getPhoto(1)} alt="" className="search-result-item__imge" />
          </NavLink>
        </div>
        <div className="search-result-item__imge-box">
          <NavLink to={CARPAGE_ROUTE + `/${props.dataCar.carID}`} target="_blank" className="search-result-item__imge-link">
            <img src={getPhoto(2)} alt="" className="search-result-item__imge" />
          </NavLink>
        </div>
      </div>
      <div className="search-result-item__description">
        <div className="description__title">{`${props.dataCar.BrandName} ${props.dataCar.ModelName} ${props.dataCar.GenerationName}`}</div>
        <div className="description__price">{props.dataCar.Price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        <div className="description__age">{props.dataCar.Age}</div>
        <div className="description__milage">{props.dataCar.Mileage.toLocaleString()} км</div>
        <ul className="description__options">
          <li className="description__options-item">{props.dataCar.BodyName}</li>
          <li className="description__options-item">{props.dataCar.TranssmissionsName}</li>
          <li className="description__options-item">{props.dataCar.VolumeEngine} л. / {props.dataCar.EnginePower} лс.</li>
          <li className="description__options-item">{props.dataCar.EnginTypeName}</li>
          <li className="description__options-item">{props.dataCar.ColorName}</li>
          <li className="description__options-item">{props.dataCar.DriveUnitName}</li>
          <li className="description__options-item">{props.dataCar.rule}</li>
          <li className="description__options-item description__options-item__color">Есть история авто</li>
        </ul>
        <div className="description__seller">
          {/* <div className="description__seller-name">Продавец АвтоМотоСП</div> */}
          <div className="description__seller-city">{props.dataCar.CityName}</div>
        </div>
        <NavLink to={CARPAGE_ROUTE + `/${props.dataCar.carID}`} target="_blank" className="description__open-card">Узнать подробнее</NavLink>
      </div>
    </div>
  )
}

export default SearchItemComponent;