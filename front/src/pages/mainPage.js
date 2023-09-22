import React, { useState } from "react";
import Header from "../components/header/Header" 
import RecpmendationListCars from "../components/recomendationsCar/RecpmendationListCars";
import MainSlider from "../components/sliders/mainslider/MainSlider";
import sliderImage1 from "./sliderImages/slider_image_1.jpg";
import sliderImage2 from "./sliderImages/slider_iamge_2.jpg";
import sliderImage3 from "./sliderImages/slider_image_3.jpg";
import Footer from "../components/footer/Footer";


const MainPage = () => {

    const [slides, setSlides] = useState(1);
    const [offset, setOffset] = useState(0);
    const [pages, setPages] = useState([]);
    const [isOpacity, setIsOpacity] = useState(false);
    const PAGE_WIDTH = 876;
    
    const handleLeftArowClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + PAGE_WIDTH;
            return Math.min(newOffset, 0);
        })

        setSlides((prevValue) => {
            let newValue = prevValue - 1
            if (newValue < 1) {
                newValue = 1
            }
            return newValue
        })


        setIsOpacity(true);
        setTimeout(() => {
            setIsOpacity(false);
        }, 700);
    }

    const handleRightArowClick = () => {
        const maxOffset = -(PAGE_WIDTH * (pages.length - 1))

        setOffset((currentOffset) => {
            const newOffset = currentOffset - PAGE_WIDTH;
            return Math.max(newOffset, maxOffset);
        })

        setSlides((prevValue) => {
            let newValue = prevValue + 1
            if (newValue > pages.length) {
                newValue = pages.length
            }
            return newValue
        })

        setIsOpacity(true);
        setTimeout(() => {
            setIsOpacity(false);
        }, 700);
    }

    return (
        <div>
            <Header setPage={() => {}}/>
            <section id="aboutUs" className="main-slider">
                <div className="container">
                    <div className="main-slider__container">
                        <div className="main-slider__arrow-left" onClick={handleLeftArowClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                                <circle cx="18.5" cy="18.5" r="18.5" transform="rotate(-180 18.5 18.5)" fill="#4C53A1"/>
                                <path d="M9.29289 18.2929C8.90237 18.6834 8.90237 19.3166 9.29289 19.7071L15.6569 26.0711C16.0474 26.4616 16.6805 26.4616 17.0711 26.0711C17.4616 25.6805 17.4616 25.0474 17.0711 24.6569L11.4142 19L17.0711 13.3431C17.4616 12.9526 17.4616 12.3195 17.0711 11.9289C16.6805 11.5384 16.0474 11.5384 15.6569 11.9289L9.29289 18.2929ZM27 18L10 18V20L27 20V18Z" fill="#EFEFEF"/>
                            </svg>
                        </div>
                        <div className="main-slider__box">
                            <div className="main-slider__wrapper">
                                <h3 className="main-slider__title">О компании</h3>
                                <div className="main-slider__slides-pagination">
                                    {
                                        pages.map((item, index) => {
                                            if (index+1 === slides) {
                                                setTimeout(() => {
                                                    return ( 
                                                        <div key={index} className="main-slider__item-pagination">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" viewBox="0 0 50 2" fill="none">
                                                                <line y1="1" x2="50" y2="1" stroke="#DC4C3E" strokeWidth="3"/>
                                                            </svg>
                                                        </div>
                                                    )
                                                }, 500)
                                            } else {
                                                setTimeout(() => {
                                                    return ( 
                                                        <div key={index} className="main-slider__item-pagination">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" viewBox="0 0 50 2" fill="none">
                                                                <line y1="1" x2="50" y2="1" stroke="#4C53A1" strokeWidth="2"/>
                                                            </svg>
                                                        </div>
                                                    )
                                                }, 500)
                                            
                                            }
                                        })
                                    }
                                </div>
                                <div className="main-slider__content">
                                    <MainSlider offset={offset} setPages={setPages} pages={pages} isOpacity={isOpacity}>
                                        <div className="main-slider__slide-item">
                                            <div className="slide-item__top-content">
                                                <div className="slide-item__top-content-left">
                                                    <h4 className="top-content-left__title">HmelAuto – ваш надежный партнер.</h4>
                                                    <p className="top-content-left__text">В HmelAuto мы специализируемся на продаже высококачественных подержанных автомобилей. Мы понимаем, что приобретение подержанного автомобиля – это серьезное решение, и поэтому мы стремимся предоставить нашим клиентам прозрачный и надежный опыт покупки.</p>
                                                    <p className="top-content-left__text">Выбирая HmelAuto, вы получаете возможность ознакомиться с историей каждого автомобиля. Мы ценим полную прозрачность и позволяем вам получить всестороннюю информацию о прошлом автомобиля. Вы можете изучить историю автомобиля, включая записи об обслуживании, предыдущих владельцах, отчеты об авариях (если таковые имеются) и данные о пробеге.</p>
                                                </div>
                                                <div className="slide-item__top-content-rigth">
                                                    <div className="top-content-rigth__image-box">
                                                        <img className="top-content-rigth__image" src={sliderImage1} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="slide-item__bottom-content">

                                            </div>
                                        </div>
                                        <div className="main-slider__slide-item">
                                            <div className="slide-item__top-content">
                                                <div className="slide-item__top-content-left">
                                                    <h4 className="top-content-left__title">Поможем выбрать автомобиль.</h4>
                                                    <p className="top-content-left__text">Мы предлагаем прозрачные сделки, качественные автомобили с полной историей и всеми документами. Наша команда профессионалов готова помочь вам выбрать идеальный автомобиль, делая процесс покупки легким и приятным. Когда вы выбираете Hmel-Avto, вы выбираете надежность и уверенность в каждой сделке.</p>
                                                </div>
                                                <div className="slide-item__top-content-rigth">
                                                    <div className="top-content-rigth__image-box">
                                                        <img className="top-content-rigth__image" src={sliderImage2} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="slide-item__bottom-content">

                                            </div>
                                        </div>
                                        <div className="main-slider__slide-item">
                                            <div className="slide-item__top-content">
                                                <div className="slide-item__top-content-left">
                                                    <h4 className="top-content-left__title">Подбираем автомобили с историей</h4>
                                                    <p className="top-content-left__text">Мы тщательно анализируем историю каждого автомобиля, проверяя его техническое состояние и обслуживание. Это позволяет нам предлагать только те автомобили, которые не только соответствуют высоким стандартам качества, но и имеют за собой увлекательную историю, которую вы будете гордиться. Покупая автомобиль у нас, вы получаете не просто транспортное средство, а историю, которая будет с вами на каждой дороге.</p>
                                                </div>
                                                <div className="slide-item__top-content-rigth">
                                                    <div className="top-content-rigth__image-box">
                                                        <img className="top-content-rigth__image" src={sliderImage3} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="slide-item__bottom-content">

                                            </div>
                                        </div>
                                    </MainSlider>
                                </div>
                            </div>
                        </div>
                        <div className="main-slider__arrow-rigth" onClick={handleRightArowClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                                <circle cx="18.5" cy="18.5" r="18.5" fill="#4C53A1"/>
                                <path d="M27.7071 19.7071C28.0976 19.3166 28.0976 18.6834 27.7071 18.2929L21.3431 11.9289C20.9526 11.5384 20.3195 11.5384 19.9289 11.9289C19.5384 12.3195 19.5384 12.9526 19.9289 13.3431L25.5858 19L19.9289 24.6569C19.5384 25.0474 19.5384 25.6805 19.9289 26.0711C20.3195 26.4616 20.9526 26.4616 21.3431 26.0711L27.7071 19.7071ZM10 20H27V18H10V20Z" fill="#EFEFEF"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
            <RecpmendationListCars />
            <Footer />
        </div>
    )
}


export default MainPage;