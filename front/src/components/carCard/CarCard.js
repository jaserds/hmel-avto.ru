import React, { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import CarsServices from "../../services/CarsServices";
import Galery from "./Galery"
import completeDocumentPng from "./../addCar/CompleteDocument.png"

const CarCard = () => {
    const carId = useParams();
    const [car, setCar] = useState({});
    const [similarCars, setSimilarCars] = useState([])
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [gallery, setGallery] = useState(false);
    const [phone, setPhone] = useState('');
    const [desc, setDesc] = useState('');

    const checkPTS = () => {
        if (car.PTS === 1) {
            return <span className="oprions-list-item__text-bold">Оригинал</span>
        } else if (car.PTS === 2) {
            return <span className="oprions-list-item__text-bold">Дубликат</span>
        } else if (car.PTS === 3) {
            return <span className="oprions-list-item__text-bold">Нет</span>
        }
    }

    const handleDownloadDocument = (document) => {
        const documentUrl = document.url + document.documentName
        window.open(documentUrl)
    }
    
    function formatPhoneNumber(phoneNumber) {
        
        if (phoneNumber !== null){
            // Удаляем все символы, кроме цифр
            phoneNumber = phoneNumber.replace(/\D/g, '');
        
            // Проверяем, имеет ли номер нужную нам длину
            if (phoneNumber.length === 11) {
            // Добавляем префикс "+7 ("
            phoneNumber = phoneNumber.replace(/^8|^7/, '+7 (');
            // Добавляем закрывающую скобку после третьей цифры
            phoneNumber = phoneNumber.replace(/(\d{3})/, '$1) ');
            // Добавляем дефисы после шестой и восьмой цифр
            phoneNumber = phoneNumber.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
            }
            setPhone(phoneNumber);
        }
    }

    const prevLocationRef = useRef();

    useEffect(() => {
      if (prevLocationRef.current !== window.location.pathname) {
        window.scrollTo(0, 0);
        prevLocationRef.current = window.location.pathname;
      }
    }, []);
    
    useEffect(() => {

        const fetchDataCars = async () => {
            try {
                const responce = await CarsServices.getCarByCarId(carId.id);
                formatPhoneNumber(responce.data.phone)
                setDesc(responce.data.DescriptionOfDefects)
                setCar(responce.data)
            } catch (error) {
                console.error(error)
            }
        }

        const fetchDataImages = async () => {
            try {
                const responce = await CarsServices.getAllPhotoByCarId(carId.id)
                setImages(responce.data)
            } catch (error) {
                console.error(error)
            }
        }

        const fetchDataDocuments = async () => {
            try {
                const responce = await CarsServices.getAllDocumentsByCarId(carId.id)
                setDocuments(responce.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchDataCars()
        fetchDataImages()
        fetchDataDocuments()

    }, [carId.id])

    useEffect(() => {

        const fetchDataSimilarCars = async () => {
            try {
                const responce = await CarsServices.getSimilarCars({
                    carID: car.carID,
                    carBrand: car.BrandName,
                    carModel: car.ModelName,
                    carPrice: car.Price,
                    carAge: car.Age,
                    carMileage: car.Mileage
                });
                setSimilarCars(responce)
            } catch (error) {
                console.error(error)
            }
        }
        
        fetchDataSimilarCars()

    }, [car])

    return (
        <section className="product-card">
        <div className="container">
            <div className="product-card__top-wrapper">
                <div className="product-card__top-content">
                    <div className="product-card__wrapper-top">
                        <div className="product-card__title-box">
                            <h1 className="product-card__title">{car.BrandName} {car.ModelName} {car.GenerationName} {car.GenerationAge}</h1>
                            <p className="product-card__city">{car.CityName}</p>
                        </div>
                        <p className="product-card__price">{car.Price !== undefined ? car.Price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0}) : car.Price}</p>
                    </div>
                    <div className="product-card__wrapper-main-content">
                        <div id="product-gallery">
                            <Galery isActive={setIsActive} gallery={setGallery} imagesData={images}/>
                        </div>
                        <div className="product-card__oprions">
                            <ul className="product-card__oprions-list">
                                <li className="product-card__oprions-list-item">
                                    Пробег: <span className="oprions-list-item__text-bold">{car.Mileage} км</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Поколение: <span className="oprions-list-item__text-bold">{car.GenerationName} ({car.GenerationAge})</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Объём двигателя: <span className="oprions-list-item__text-bold">{car.VolumeEngine} л</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Мощьность двигателя: <span className="oprions-list-item__text-bold">{car.EnginePower} л.с.</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Тип двигателя: <span className="oprions-list-item__text-bold">{car.EnginTypeName}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Трансмиссия: <span className="oprions-list-item__text-bold">{car.TranssmissionsName}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Руль: <span className="oprions-list-item__text-bold">{car.rule}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Кузов: <span className="oprions-list-item__text-bold">{car.BodyName}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    VIN: <span className="oprions-list-item__text-bold">{car.VIN}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Привод: <span className="oprions-list-item__text-bold">{car.DriveUnitName}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Цвет: <span className="oprions-list-item__text-bold">{car.ColorName}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    ПТС: {checkPTS()}                                    
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Владельцев по ПТС: <span className="oprions-list-item__text-bold">{car.QtyPerson}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Состояние: <span className="oprions-list-item__text-bold">{car.State === 0 ? 'Нет дефектов' : 'Имеются дефекты'}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Таможня: <span className="oprions-list-item__text-bold">{car.Customs === 0 ? 'Нет' : 'Да'}</span>
                                </li>
                                <li className="product-card__oprions-list-item">
                                    Год выпуска: <span className="oprions-list-item__text-bold">{car.Age}</span>
                                </li>
                            </ul>
                            { phone && <a className="product-card__phone-number-link"><div className="product-card__phone-number">{phone}</div></a>}
                        </div>
                    </div>
                    <div className="product-card__about-car-box">
                        <h2 className="product-card__about-car-docs-title">Документы</h2>
                        <h3 className="product-card__about-car-subtitle">Скачайте доступные документы на этот автомобиль</h3>
                        <div className="product-card__about-car-documents">
                           {documents.map((document, index) => {
                                return (
                                            <div key={index} className="prev-box__wrapper" onClick={() => {handleDownloadDocument(document)}}>
                                                <div className="prev-box__document">
                                                    <img className="prev-box__add-element-image" src={completeDocumentPng} alt="" />
                                                </div>
                                                <p className="prev-box__add-element-text">{document.documentName}</p>
                                            </div>
                                        )
                           })}
                        </div>
                    </div>
                    <div className="product-card__about-car-box">
                        <h2 className="product-card__about-car-title">Описание</h2>
                        <div className="product-card__about-car-description">
                        <div dangerouslySetInnerHTML={{ __html: desc }} />
                        </div>
                    </div>
                </div>
                <div className="product-card__widget">
                    <h3 className="product-card__widget-title">Похожее</h3>
                    <ul className="product-card__list">
                        {similarCars ? similarCars.map((similarCar, index) => {

                            return (
                                <li key={index} className="product-card__list-item">
                                    <NavLink to={"https://hmel-avto.ru/car/" + similarCar.carID} className="product-card__list-item-link">
                                        <div className="product-card__item-image-box">
                                            <div className="product-card__item-wrapper">
                                                <img src={"/images/" + similarCar.photocar} alt="" className="product-card__item-image" />
                                            </div>
                                        </div>
                                        <p className="product-card__item-price">{similarCar.Price} ₽</p>
                                        <h4 className="product-card__item-title">{similarCar.BrandName} {similarCar.ModelName}</h4>
                                        <p className="product-card__item-milage">{similarCar.Age} / {similarCar.Mileage}</p>
                                    </NavLink>
                                </li>
                            )
                        })
                        :
                        <li className="product-card__list-item">
                            
                        </li>
                        }                      
                    </ul>
                </div>
            </div>
        </div>
        <div className={isActive ? `fullscreen-gallery-wrapper gallery-active` : `fullscreen-gallery-wrapper`}>
            {gallery}
        </div>
    </section> 
    )
    
}


export default CarCard;